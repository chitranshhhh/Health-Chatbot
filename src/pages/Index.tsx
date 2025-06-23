
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, HeartPulse, MessageSquare, Users } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      
      {/* Main Services Section */}
      <section className="section-padding bg-secondary/50">
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Main Services</h2>
            <p className="text-lg text-muted-foreground">
              Explore our core offerings designed to support your complete health journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card rounded-xl overflow-hidden card-hover p-8">
              <div className="mb-6 p-4 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Brain size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Mental Health</h3>
              <p className="text-muted-foreground mb-6">
                Comprehensive resources for anxiety, depression, stress management, therapy options, 
                mindfulness practices, and personalized mental wellness plans.
              </p>
              <Button asChild>
                <Link to="/mental-health" className="group">
                  Explore Mental Health
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            
            <div className="glass-card rounded-xl overflow-hidden card-hover p-8">
              <div className="mb-6 p-4 w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                <HeartPulse size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">General Health</h3>
              <p className="text-muted-foreground mb-6">
                Information about common illnesses, symptoms, treatments, preventive care, 
                nutrition advice, fitness guidance, and health monitoring tools.
              </p>
              <Button asChild>
                <Link to="/general-health" className="group">
                  Explore General Health
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            
            <div className="glass-card rounded-xl overflow-hidden card-hover p-8">
              <div className="mb-6 p-4 w-16 h-16 rounded-2xl bg-blue-400/10 flex items-center justify-center text-blue-500">
                <MessageSquare size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Health Assistant</h3>
              <p className="text-muted-foreground mb-6">
                AI-powered chat assistant to answer health questions, provide general guidance, 
                suggest resources, and help navigate health concerns.
              </p>
              <Button asChild>
                <Link to="/chat" className="group">
                  Chat with Assistant
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            
            <div className="glass-card rounded-xl overflow-hidden card-hover p-8">
              <div className="mb-6 p-4 w-16 h-16 rounded-2xl bg-purple-400/10 flex items-center justify-center text-purple-500">
                <Users size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Find a Doctor</h3>
              <p className="text-muted-foreground mb-6">
                Location-based search for healthcare providers, specialist directories, 
                appointment scheduling, telehealth options, and doctor profiles.
              </p>
              <Button asChild>
                <Link to="/find-doctor" className="group">
                  Find Healthcare Providers
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-muted-foreground">
              Read about real experiences from people who've used our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "The mental health resources here have been transformative for managing my anxiety. The guided techniques actually work!",
                name: "Sarah L.",
                title: "Anxiety Management"
              },
              {
                quote: "Finding a specialist in my area was incredibly easy. I was able to book an appointment and get the care I needed quickly.",
                name: "Michael T.",
                title: "Found Local Specialist"
              },
              {
                quote: "The health assistant chat helped me understand my symptoms and when I should see a doctor. Saved me unnecessary worry.",
                name: "Priya K.",
                title: "Used Health Assistant"
              }
            ].map((testimonial, index) => (
              <div key={index} className="glass-card rounded-xl p-6">
                <div className="mb-4 text-primary">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-lg mb-6">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-padding bg-primary/5">
        <div className="page-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Take Control of Your Health?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start your wellness journey today with personalized resources and expert support.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/mental-health">Explore Mental Health</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/general-health">Browse General Health</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/chat">Chat with Health Assistant</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-background py-12 border-t">
        <div className="page-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">HealthHive</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Your comprehensive platform for mental and physical health resources.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {["Home", "Mental Health", "General Health", "Find Doctor", "Chat"].map((item) => (
                  <li key={item}>
                    <Link 
                      to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                {["Privacy Policy", "Terms of Service", "FAQ", "Contact Us", "About Us"].map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Connect With Us</h3>
              <div className="flex space-x-4 mb-4">
                {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                    </svg>
                  </a>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Stay connected for updates and new features.
              </p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} HealthHive. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
