
import { 
  Brain,
  HeartPulse,
  MessageSquare,
  Users,
  Zap,
  ShieldCheck,
  Clock,
  MapPin
} from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="group p-6 glass-card rounded-xl transition-all duration-300 hover:scale-105">
      <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export function Features() {
  const features = [
    {
      icon: <Brain size={24} />,
      title: "Mental Health Resources",
      description: "Access expert guidance on stress, anxiety, depression, and other mental health concerns.",
    },
    {
      icon: <HeartPulse size={24} />,
      title: "General Health Support",
      description: "Information on common illnesses, symptoms, treatments, and preventive care.",
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Health Assistant Chat",
      description: "Get instant answers to your health questions from our AI-powered assistant.",
    },
    {
      icon: <Users size={24} />,
      title: "Doctor Consultation",
      description: "Connect with qualified healthcare professionals for personalized advice.",
    },
    {
      icon: <MapPin size={24} />,
      title: "Locate Nearby Doctors",
      description: "Find healthcare providers in your area with our location-based search.",
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Private & Secure",
      description: "Your health information is protected with industry-leading security measures.",
    },
    {
      icon: <Clock size={24} />,
      title: "24/7 Availability",
      description: "Access health information and support whenever you need it, day or night.",
    },
    {
      icon: <Zap size={24} />,
      title: "Fast & Reliable",
      description: "Get quick, evidence-based health information you can trust.",
    },
  ];

  return (
    <section className="section-padding">
      <div className="page-container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Health Support at Your Fingertips</h2>
          <p className="text-lg text-muted-foreground">
            Everything you need for better health, all in one place. Our platform offers a wide range of features to support your mental and physical wellbeing.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
