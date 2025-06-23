import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Brain, 
  HeartHandshake, 
  TreeDeciduous, 
  Flame, 
  Moon, 
  Dumbbell, 
  Users, 
  BookOpen,
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HealthCard } from "@/components/HealthCard";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

export default function MentalHealth() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({
    header: false,
    resources: false,
    strategies: false,
    help: false
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["header", "resources", "strategies", "help"];
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight * 0.75 && rect.bottom >= 0;
          setIsVisible(prev => ({ ...prev, [section]: isInView }));
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const resources = [
    {
      title: "Anxiety",
      description: "Resources and techniques to help manage anxiety and panic attacks.",
      icon: <Flame size={28} />,
      to: "/mental-health/anxiety",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Depression",
      description: "Information about depression, its symptoms, and treatment options.",
      icon: <Moon size={28} />,
      to: "/mental-health/depression",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      title: "Stress Management",
      description: "Techniques and practices for reducing stress in daily life.",
      icon: <Brain size={28} />,
      to: "/mental-health/stress",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Mindfulness",
      description: "Learn how to practice mindfulness and improve mental wellbeing.",
      icon: <TreeDeciduous size={28} />,
      to: "/mental-health/mindfulness",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Sleep",
      description: "Improve your sleep habits and manage sleep-related issues.",
      icon: <Moon size={28} />,
      to: "/mental-health/sleep",
      gradient: "from-indigo-500 to-blue-600"
    },
    {
      title: "Exercise & Mental Health",
      description: "Understanding the connection between physical activity and mental wellness.",
      icon: <Dumbbell size={28} />,
      to: "/mental-health/exercise",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      title: "Support Groups",
      description: "Connect with others facing similar challenges for mutual support.",
      icon: <Users size={28} />,
      to: "/mental-health/support-groups",
      gradient: "from-teal-500 to-green-500"
    },
    {
      title: "Mental Health Education",
      description: "Learn about different aspects of mental health and psychology.",
      icon: <BookOpen size={28} />,
      to: "/mental-health/education",
      gradient: "from-cyan-500 to-blue-500"
    }
  ];

  const strategies = [
    {
      title: "Deep Breathing",
      description: "Take slow, deep breaths to reduce stress and anxiety.",
      steps: [
        "Find a comfortable position",
        "Breathe in through your nose for 4 seconds",
        "Hold your breath for 2 seconds",
        "Exhale through your mouth for 6 seconds",
        "Repeat 5-10 times"
      ]
    },
    {
      title: "Progressive Muscle Relaxation",
      description: "Tense and release muscles to reduce physical tension.",
      steps: [
        "Start by tensing your toes for 5 seconds",
        "Release the tension and notice the relaxation",
        "Move up to your calves, then thighs",
        "Continue up through your body to your face",
        "Notice the difference between tension and relaxation"
      ]
    },
    {
      title: "5-4-3-2-1 Grounding",
      description: "Use your senses to ground yourself in the present moment.",
      steps: [
        "Notice 5 things you can see",
        "Notice 4 things you can touch",
        "Notice 3 things you can hear",
        "Notice 2 things you can smell",
        "Notice 1 thing you can taste"
      ]
    },
    {
      title: "Thought Challenging",
      description: "Identify and question negative thoughts.",
      steps: [
        "Identify the negative thought",
        "Note the evidence for and against it",
        "Consider a more balanced perspective",
        "Practice replacing negative thoughts",
        "Notice how your feelings change"
      ]
    }
  ];

  // Updated self-assessments array with distinct routes
  const selfAssessments = [
    {
      title: "Stress Level Check",
      description: "A quick assessment to gauge your current stress levels.",
      questions: 7,
      time: "3 min",
      route: "/mental-health/assessment/stress"
    },
    {
      title: "Anxiety Screening",
      description: "Recognize signs of general anxiety and related disorders.",
      questions: 10,
      time: "5 min",
      route: "/mental-health/assessment/anxiety"
    },
    {
      title: "Depression Screening",
      description: "Check for symptoms of depression and mood disorders.",
      questions: 9,
      time: "4 min",
      route: "/mental-health/assessment/depression"
    },
    {
      title: "Sleep Quality Assessment",
      description: "Evaluate your sleep patterns and identify issues.",
      questions: 8,
      time: "4 min",
      route: "/mental-health/assessment/sleep"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section 
        id="header" 
        className={`section-padding transition-all duration-1000 transform ${isVisible.header ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <div className="page-container mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              Mental Health Resources
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Support for Your <span className="text-primary">Mental Wellbeing</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore our comprehensive mental health resources, tools, and support options. Whether you're looking for help with anxiety, depression, stress, or simply want to improve your overall mental wellness, we have resources to support you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <a href="#resources">Browse Resources</a>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/chat">Talk to Health Assistant</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section 
        id="resources" 
        className={`section-padding bg-secondary/50 transition-all duration-1000 transform ${isVisible.resources ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <div className="page-container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mental Health Topics</h2>
            <p className="text-lg text-muted-foreground">Explore our library of resources on various mental health topics</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <HealthCard
                key={index}
                title={resource.title}
                description={resource.description}
                icon={resource.icon}
                to={resource.to}
                gradient={resource.gradient}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Coping Strategies Section */}
      <section 
        id="strategies" 
        className={`section-padding transition-all duration-1000 transform ${isVisible.strategies ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <div className="page-container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Relief Techniques</h2>
            <p className="text-lg text-muted-foreground">
              Try these evidence-based coping strategies for immediate relief during difficult moments
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {strategies.map((strategy, index) => (
              <div key={index} className="glass-card rounded-xl p-6 card-hover">
                <h3 className="text-xl font-bold mb-2">{strategy.title}</h3>
                <p className="text-muted-foreground mb-4">{strategy.description}</p>
                <ol className="space-y-2">
                  {strategy.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center mr-3 mt-0.5">
                        {stepIndex + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Tools Section */}
      <section 
        id="help" 
        className={`section-padding bg-secondary/50 transition-all duration-1000 transform ${isVisible.help ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <div className="page-container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Self-Assessment Tools</h2>
            <p className="text-lg text-muted-foreground">
              These tools are designed to help you understand your mental health better. While they are not diagnostic, they can guide you toward appropriate resources.
            </p>
          </div>
          <Tabs defaultValue="assessments" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="assessments">Self-Assessments</TabsTrigger>
              <TabsTrigger value="emergency">Emergency Resources</TabsTrigger>
            </TabsList>
            <TabsContent value="assessments">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selfAssessments.map((assessment, index) => (
                  <div key={index} className="glass-card rounded-xl overflow-hidden card-hover">
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{assessment.title}</h3>
                      <p className="text-muted-foreground mb-4">{assessment.description}</p>
                      <div className="flex justify-between text-sm mb-6">
                        <span className="flex items-center gap-1">{assessment.questions} questions</span>
                        <span className="flex items-center gap-1">{assessment.time}</span>
                      </div>
                      <Button asChild className="w-full">
                        <Link to={assessment.route}>Take Assessment</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="emergency">
              <div className="glass-card rounded-xl p-8 text-center">
                <div className="inline-flex mb-6 p-4 rounded-full bg-destructive/10">
                  <HeartHandshake size={32} className="text-destructive" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
                <p className="text-lg mb-6 max-w-2xl mx-auto">
                  If you're experiencing a mental health emergency or having thoughts of harming yourself, please reach out to emergency services or a crisis hotline immediately.
                </p>
                <div className="max-w-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-lg bg-background border">
                    <h4 className="font-bold mb-1">National Suicide Prevention Lifeline</h4>
                    <p className="text-lg font-bold text-primary">1-800-273-8255</p>
                    <p className="text-sm text-muted-foreground">Available 24/7</p>
                  </div>
                  <div className="p-4 rounded-lg bg-background border">
                    <h4 className="font-bold mb-1">Crisis Text Line</h4>
                    <p className="text-lg font-bold text-primary">Text HOME to 741741</p>
                    <p className="text-sm text-muted-foreground">Available 24/7</p>
                  </div>
                </div>
                <div className="flex justify-center gap-4 flex-wrap">
                  <Button variant="outline">Find Local Resources</Button>
                  <Button asChild>
                    <Link to="/find-doctor">Connect with a Professional</Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="page-container mx-auto">
          <div className="glass-card rounded-xl p-8 md:p-12 text-center max-w-4xl mx-auto card-hover">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Personalized Support?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our health assistant can help you find the right resources for your specific situation, or you can connect with a mental health professional for expert guidance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/chat" className="group">
                  Chat with Health Assistant
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/find-doctor">Find a Mental Health Professional</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
