
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const [currentText, setCurrentText] = useState(0);
  const rotatingTexts = ["healthier", "happier", "stronger", "confident"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % rotatingTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden min-h-screen flex items-center">
      {/* Background Elements */}
      <div className="absolute top-0 inset-0 bg-gradient-to-b from-primary/5 to-background/20 -z-10" />
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl -z-10 animate-float" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl -z-10 animate-float" style={{ animationDelay: "-3s" }} />
      
      <div className="page-container pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              Your Path to Wellness Starts Here
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Become {" "}
              <span className="relative inline-block text-primary">
                <span className="absolute inset-0 flex">
                  {rotatingTexts.map((text, index) => (
                    <span
                      key={text}
                      className="absolute transition-opacity duration-500 w-full"
                      style={{
                        opacity: currentText === index ? 1 : 0,
                        transform: currentText === index ? "translateY(0)" : "translateY(10px)",
                        transition: "opacity 500ms, transform 500ms"
                      }}
                    >
                      {text}
                    </span>
                  ))}
                </span>
                <span className="relative opacity-0">
                  {rotatingTexts[0]}
                </span>
              </span>
              <br />
              with expert guidance
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Accessible healthcare solutions for your mental and physical wellbeing, all in one place. Connect with professionals, explore resources, and find the support you need.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/find-doctor" className="group">
                  Find a Doctor
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/chat">Talk to Health Assistant</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square max-w-[500px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-3xl -z-10" />
              <img 
                src="/public/healthhive.png" 
                alt="Healthcare professionals" 
                className="rounded-2xl object-cover h-full w-full shadow-lg animate-fade-in"
              />
              <div className="absolute -bottom-6 -left-6 p-6 glass-card rounded-xl animate-fade-in" style={{ animationDelay: "200ms" }}>
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">1000+</h3>
                    <p className="text-sm text-muted-foreground">Certified Doctors</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 p-6 glass-card rounded-xl animate-fade-in" style={{ animationDelay: "400ms" }}>
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">24/7</h3>
                    <p className="text-sm text-muted-foreground">Support Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
