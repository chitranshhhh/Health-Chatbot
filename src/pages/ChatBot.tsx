import { useState, useRef, useEffect } from "react";
import { Send, Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { sendMessageToChatbot } from "@/utils/sendMessageToChatbot";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: Date;
}

export default function ChatBot() {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" state={{ from: "/chat" }} />;
  }
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "Welcome to HealthConnect AI Assistant. How can I help you today? You can ask me about symptoms, general health information, or mental wellbeing topics.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Suggested prompts
  const suggestedPrompts = [
    "What are common symptoms of anxiety?",
    "How can I improve my sleep quality?",
    "Tell me about heart-healthy diets",
    "What exercises help with lower back pain?",
    "Signs I should see a doctor about depression",
    "Breathing techniques for stress management"
  ];

  // Auto-scroll to the bottom of the messages
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
  
    const userMessage = input.trim();
    setInput("");
  
    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: userMessage, timestamp: new Date() }
    ];
  
    setMessages(newMessages);
    setIsLoading(true);
  
    try {
      const pythonEndpoint = import.meta.env.VITE_PYTHON_ENDPOINT || 'http://localhost:5000/chat';

      const response = await sendMessageToChatbot(userMessage, pythonEndpoint);
  
      setMessages(prevMessages => [
        ...prevMessages,
        { role: "assistant", content: response.message, timestamp: new Date() }
      ]);
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
  
      setMessages(prevMessages => [
        ...prevMessages,
        { role: "assistant", content: "I'm having trouble responding. Try again later.", timestamp: new Date() }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="page-container flex flex-col h-[calc(100vh-8rem)]">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" className="mr-2 md:hidden">
            <ArrowLeft size={18} />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Health Assistant</h1>
            <p className="text-sm text-muted-foreground">AI-powered healthcare guidance</p>
          </div>
        </div>
        
        <Card className="flex-1 flex flex-col overflow-hidden glass-card">
          {/* Messages Area */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/logo.png" alt="AI" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                
                <div 
                  className={`max-w-[80%] ${
                    message.role === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : message.role === "system"
                      ? "bg-muted"
                      : "bg-secondary"
                  } rounded-lg p-3`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  {message.timestamp && (
                    <div className="text-xs opacity-70 mt-1 text-right">
                      {formatTimestamp(message.timestamp)}
                    </div>
                  )}
                </div>
                
                {message.role === "user" && (
                  <Avatar className="h-8 w-8 ml-2">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/logo.png" alt="AI" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="bg-secondary rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                    <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </CardContent>
          
          {/* Suggested Prompts */}
          {messages.length < 3 && (
            <>
              <Separator />
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-3">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.map((prompt, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-secondary transition-colors"
                      onClick={() => handleSuggestedPrompt(prompt)}
                    >
                      {prompt}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
          
          {/* Input Area */}
          <div className="p-4 border-t bg-card">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="shrink-0"
                title="Attach files"
              >
                <Plus size={18} />
              </Button>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="min-h-10 resize-none"
                rows={1}
              />
              <Button 
                className="shrink-0" 
                size="icon" 
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
