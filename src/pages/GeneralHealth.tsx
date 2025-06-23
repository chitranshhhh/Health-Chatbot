
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Thermometer, 
  Stethoscope, 
  Pill, 
  Dumbbell, 
  Apple, 
  Droplets,
  Heart,
  HeartPulse,
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

export default function GeneralHealth() {
  // Animation on scroll logic
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({
    header: false,
    common: false,
    wellness: false,
    firstAid: false
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["header", "common", "wellness", "firstAid"];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight * 0.75 && rect.bottom >= 0;
          setIsVisible(prev => ({ ...prev, [section]: isInView }));
        }
      }
    };

    handleScroll(); // Check on first render
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const commonIllnesses = [
    {
      title: "Common Cold",
      description: "Information about symptoms, treatment, and prevention of the common cold.",
      icon: <Thermometer size={28} />,
      to: "/general-health/common-cold",
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      title: "Influenza (Flu)",
      description: "Learn about flu symptoms, when to see a doctor, and prevention strategies.",
      icon: <Thermometer size={28} />,
      to: "/general-health/flu",
      gradient: "from-orange-400 to-amber-500"
    },
    {
      title: "Allergies",
      description: "Understand different types of allergies, their triggers, and management options.",
      icon: <Stethoscope size={28} />,
      to: "/general-health/allergies",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      title: "Headaches",
      description: "Different types of headaches, their causes, and treatment approaches.",
      icon: <Stethoscope size={28} />,
      to: "/general-health/headaches",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      title: "Digestive Issues",
      description: "Common digestive problems, their symptoms, and management strategies.",
      icon: <Pill size={28} />,
      to: "/general-health/digestive",
      gradient: "from-amber-500 to-yellow-500"
    },
    {
      title: "Skin Conditions",
      description: "Information about common skin problems and how to address them.",
      icon: <Droplets size={28} />,
      to: "/general-health/skin",
      gradient: "from-pink-400 to-rose-500"
    },
    {
      title: "Respiratory Infections",
      description: "Bronchitis, pneumonia, and other respiratory conditions explained.",
      icon: <HeartPulse size={28} />,
      to: "/general-health/respiratory",
      gradient: "from-teal-400 to-cyan-500"
    },
    {
      title: "Heart Health",
      description: "Understanding cardiovascular health, risk factors, and prevention strategies.",
      icon: <Heart size={28} />,
      to: "/general-health/heart",
      gradient: "from-red-500 to-rose-500"
    }
  ];

  const wellnessTopics = [
    {
      title: "Sleep Hygiene",
      description: "Tips for improving sleep quality and establishing healthy sleep patterns.",
      steps: [
        "Maintain a consistent sleep schedule",
        "Create a restful environment",
        "Limit exposure to screens before bedtime",
        "Avoid caffeine and alcohol before sleep",
        "Exercise regularly, but not too close to bedtime"
      ]
    },
    {
      title: "Nutrition Basics",
      description: "Foundational principles for a balanced, nutritious diet.",
      steps: [
        "Eat plenty of fruits and vegetables",
        "Choose whole grains over refined options",
        "Include lean proteins in your diet",
        "Limit processed foods and added sugars",
        "Stay hydrated throughout the day"
      ]
    },
    {
      title: "Exercise Fundamentals",
      description: "Key components of a well-rounded physical activity routine.",
      steps: [
        "Aim for 150 minutes of moderate activity weekly",
        "Include both cardio and strength training",
        "Add flexibility and balance exercises",
        "Start slowly and gradually increase intensity",
        "Find activities you enjoy to stay motivated"
      ]
    },
    {
      title: "Stress Management",
      description: "Practical techniques for reducing everyday stress.",
      steps: [
        "Practice deep breathing or meditation",
        "Maintain social connections",
        "Set realistic goals and priorities",
        "Make time for hobbies and activities you enjoy",
        "Get regular physical activity"
      ]
    }
  ];

  const firstAidGuides = [
    {
      title: "Cuts and Scrapes",
      steps: [
        "Clean the wound with soap and water",
        "Apply gentle pressure to stop bleeding",
        "Apply an antibiotic ointment",
        "Cover with a sterile bandage",
        "Change the bandage daily"
      ],
      warning: "Seek medical attention for deep wounds, heavy bleeding, or signs of infection."
    },
    {
      title: "Burns",
      steps: [
        "Cool the burn with cool (not cold) running water for 10-15 minutes",
        "Do not apply ice directly to the burn",
        "Cover with a clean, dry bandage",
        "Take over-the-counter pain reliever if needed",
        "Do not pop blisters"
      ],
      warning: "Seek immediate medical attention for severe burns, burns covering large areas, or burns on the face, hands, feet, or genitals."
    },
    {
      title: "Sprains",
      steps: [
        "Rest the injured area",
        "Apply ice for 20 minutes several times a day",
        "Compress the area with an elastic bandage",
        "Elevate the injured limb above heart level when possible",
        "Take over-the-counter pain relievers if needed"
      ],
      warning: "See a doctor if you can't bear weight on the injury, there's severe swelling, or you hear a popping sound at the time of injury."
    },
    {
      title: "Choking",
      steps: [
        "Encourage the person to cough",
        "Give 5 back blows between the shoulder blades",
        "Perform 5 abdominal thrusts (Heimlich maneuver)",
        "Alternate between 5 back blows and 5 abdominal thrusts",
        "Call emergency services if the obstruction doesn't clear"
      ],
      warning: "If the person becomes unconscious, begin CPR if you're trained. Always call emergency services in serious situations."
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section 
        id="header" 
        className={`section-padding transition-all duration-1000 transform ${
          isVisible.header ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="page-container">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6">
              General Health Resources
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your Guide to <span className="text-accent">Physical Wellbeing</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Access comprehensive information about common health conditions, wellness practices,
              prevention strategies, and first aid guidance for everyday health concerns.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <a href="#common">
                  Common Conditions
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/chat">
                  Ask Health Assistant
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Common Conditions Section */}
      <section 
        id="common" 
        className={`section-padding bg-secondary/50 transition-all duration-1000 transform ${
          isVisible.common ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Common Health Conditions</h2>
            <p className="text-lg text-muted-foreground">
              Information about frequently experienced health concerns and illnesses
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commonIllnesses.map((illness, index) => (
              <HealthCard
                key={index}
                title={illness.title}
                description={illness.description}
                icon={illness.icon}
                to={illness.to}
                gradient={illness.gradient}
              />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/general-health/all-conditions" className="group">
                View All Conditions
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Wellness Section */}
      <section 
        id="wellness" 
        className={`section-padding transition-all duration-1000 transform ${
          isVisible.wellness ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Wellness Fundamentals</h2>
            <p className="text-lg text-muted-foreground">
              Essential practices for maintaining good physical health and preventing illness
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {wellnessTopics.map((topic, index) => (
              <div key={index} className="glass-card rounded-xl p-6 card-hover">
                <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
                <p className="text-muted-foreground mb-4">{topic.description}</p>
                <ol className="space-y-2">
                  {topic.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs flex items-center justify-center mr-3 mt-0.5">
                        {stepIndex + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          
          <div className="mt-16 glass-card rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-accent/20 to-primary/20 p-1"></div>
            <div className="p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4">
                    <Dumbbell size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Physical Activity</h3>
                  <p className="text-muted-foreground">
                    Regular exercise improves cardiovascular health, strengthens muscles, and enhances mood.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Apple size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Balanced Nutrition</h3>
                  <p className="text-muted-foreground">
                    A varied, nutritious diet provides essential nutrients and supports overall health.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                  <div className="w-16 h-16 rounded-full bg-blue-400/10 flex items-center justify-center text-blue-500 mb-4">
                    <Droplets size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Hydration</h3>
                  <p className="text-muted-foreground">
                    Proper hydration supports digestion, circulation, and temperature regulation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* First Aid Section */}
      <section 
        id="firstAid" 
        className={`section-padding bg-secondary/50 transition-all duration-1000 transform ${
          isVisible.firstAid ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">First Aid Basics</h2>
            <p className="text-lg text-muted-foreground">
              Essential first aid information for common injuries and emergency situations
            </p>
          </div>
          
          <Tabs defaultValue="guides" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="guides">First Aid Guides</TabsTrigger>
              <TabsTrigger value="kit">First Aid Kit Essentials</TabsTrigger>
            </TabsList>
            
            <TabsContent value="guides">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {firstAidGuides.map((guide, index) => (
                  <div key={index} className="glass-card rounded-xl overflow-hidden card-hover">
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3">{guide.title}</h3>
                      <ol className="space-y-2 mb-4">
                        {guide.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs flex items-center justify-center mr-3 mt-0.5">
                              {stepIndex + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                      <div className="p-3 bg-destructive/10 rounded-lg text-sm">
                        <strong className="text-destructive">Important: </strong>
                        <span>{guide.warning}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="kit">
              <div className="glass-card rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">What to Include in Your First Aid Kit</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Bandages & Dressings",
                      items: [
                        "Adhesive bandages (various sizes)",
                        "Sterile gauze pads",
                        "Adhesive tape",
                        "Elastic wrap bandages",
                        "Triangular bandages"
                      ]
                    },
                    {
                      title: "Tools & Equipment",
                      items: [
                        "Scissors",
                        "Tweezers",
                        "Safety pins",
                        "Disposable gloves",
                        "Digital thermometer"
                      ]
                    },
                    {
                      title: "Medications & Treatments",
                      items: [
                        "Antiseptic wipes",
                        "Antibiotic ointment",
                        "Hydrocortisone cream",
                        "Pain relievers (acetaminophen, ibuprofen)",
                        "Antihistamines"
                      ]
                    }
                  ].map((category, index) => (
                    <div key={index} className="p-4 bg-background rounded-lg border">
                      <h4 className="font-bold mb-3">{category.title}</h4>
                      <ul className="space-y-2">
                        {category.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center">
                            <svg className="w-4 h-4 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-4 bg-primary/10 rounded-lg text-center">
                  <p className="text-sm">
                    Remember to check your first aid kit regularly to replace expired items and restock used supplies.
                    Store your kit in a cool, dry place that's easily accessible in an emergency.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/general-health/first-aid" className="group">
                View Complete First Aid Guide
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Preventive Care Section */}
      <section className="section-padding">
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Preventive Health Care</h2>
            <p className="text-lg text-muted-foreground">
              Proactive measures to maintain good health and prevent illness
            </p>
          </div>
          
          <div className="glass-card rounded-xl overflow-hidden card-hover">
            <div className="p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Regular Health Screenings</h3>
                  <p className="text-muted-foreground mb-6">
                    Regular check-ups and screenings are essential for early detection and prevention of health issues.
                    Talk to your healthcare provider about which screenings are appropriate for your age, gender, and risk factors.
                  </p>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Annual Physical Exam",
                        description: "Comprehensive health assessment to identify potential concerns"
                      },
                      {
                        title: "Blood Pressure Screening",
                        description: "Regular monitoring to prevent cardiovascular issues"
                      },
                      {
                        title: "Cholesterol Screening",
                        description: "Assess heart health and risk of cardiovascular disease"
                      },
                      {
                        title: "Cancer Screenings",
                        description: "Age and risk-appropriate tests for early detection"
                      }
                    ].map((screening, index) => (
                      <div key={index} className="p-4 bg-background rounded-lg border">
                        <h4 className="font-bold">{screening.title}</h4>
                        <p className="text-sm text-muted-foreground">{screening.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Healthy Lifestyle Choices</h3>
                  <p className="text-muted-foreground mb-6">
                    Daily habits and lifestyle choices have a significant impact on your long-term health and wellbeing.
                    Small, consistent changes can lead to substantial health benefits over time.
                  </p>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Balanced Nutrition",
                        description: "Focus on whole foods, fruits, vegetables, and lean proteins"
                      },
                      {
                        title: "Regular Physical Activity",
                        description: "Aim for at least 150 minutes of moderate exercise weekly"
                      },
                      {
                        title: "Adequate Sleep",
                        description: "Prioritize 7-9 hours of quality sleep each night"
                      },
                      {
                        title: "Stress Management",
                        description: "Practice relaxation techniques and maintain work-life balance"
                      }
                    ].map((habit, index) => (
                      <div key={index} className="p-4 bg-background rounded-lg border">
                        <h4 className="font-bold">{habit.title}</h4>
                        <p className="text-sm text-muted-foreground">{habit.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Button asChild>
                  <Link to="/find-doctor" className="group">
                    Schedule a Preventive Check-up
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-secondary/50">
        <div className="page-container">
          <div className="glass-card rounded-xl p-8 md:p-12 text-center max-w-4xl mx-auto card-hover">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Have Health Questions?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our health assistant can help answer your questions about symptoms, conditions, 
              or preventive care, or you can connect with a healthcare professional for personalized advice.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/chat" className="group">
                  Chat with Health Assistant
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/find-doctor">
                  Connect with a Doctor
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
