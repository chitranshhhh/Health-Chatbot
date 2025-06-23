
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  location: string;
  distance: string;
  phone: string;
  email: string;
  availability: string;
  rating: number;
}
import {
  MapPin,
  Search,
  Filter,
  Clock,
  Star,
  ChevronDown,
  ArrowRight,
  AlarmClock,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { DoctorCard } from "@/components/DoctorCard";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Sample doctor data
const sampleDoctors: Doctor[] = [
  {
    id: "dr-1",
    name: "Dr. Sarah Johnson",
    specialty: "General Practitioner",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    location: "Downtown Medical Center",
    distance: "1.2 miles",
    phone: "(555) 123-4567",
    email: "sarah.johnson@healthhive.com",
    availability: "Mon-Fri, 9am-5pm",
    rating: 4.8
  },
  {
    id: "dr-2",
    name: "Dr. James Wilson",
    specialty: "Cardiologist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    location: "Heart & Vascular Institute",
    distance: "2.5 miles",
    phone: "(555) 234-5678",
    email: "james.wilson@healthhive.com",
    availability: "Tue-Thu, 10am-6pm",
    rating: 4.9
  },
  {
    id: "dr-3",
    name: "Dr. Emily Chen",
    specialty: "Psychiatrist",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    location: "Mindful Wellness Center",
    distance: "0.8 miles",
    phone: "(555) 345-6789",
    email: "emily.chen@healthhive.com",
    availability: "Mon-Wed & Fri, 8am-4pm",
    rating: 4.7
  },
  {
    id: "dr-4",
    name: "Dr. Michael Patel",
    specialty: "Dermatologist",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    location: "Skin Health Clinic",
    distance: "3.1 miles",
    phone: "(555) 456-7890",
    email: "michael.patel@healthhive.com",
    availability: "Mon & Thu-Sat, 9am-5pm",
    rating: 4.6
  },
  {
    id: "dr-5",
    name: "Dr. Lisa Martinez",
    specialty: "Pediatrician",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    location: "Children's Wellness Center",
    distance: "1.7 miles",
    phone: "(555) 567-8901",
    email: "lisa.martinez@healthhive.com",
    availability: "Mon-Fri, 8am-4pm",
    rating: 4.9
  },
  {
    id: "dr-6",
    name: "Dr. Robert Kim",
    specialty: "Neurologist",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    location: "Neuroscience Institute",
    distance: "4.3 miles",
    phone: "(555) 678-9012",
    email: "robert.kim@healthhive.com",
    availability: "Tue-Fri, 10am-6pm",
    rating: 4.8
  }
];

export default function FindDoctor() {
  const { toast } = useToast();
  const [location, setLocation] = useState("");
  const [locationPermission, setLocationPermission] = useState<"granted" | "denied" | "prompt">("prompt");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({
    header: false,
    filters: false,
    doctors: false,
  });

  // Animation on scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["header", "filters", "doctors"];
      
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

  // Initialize doctors
  useEffect(() => {
    setDoctors(sampleDoctors);
  }, []);

  // Request location access
  const requestLocationAccess = () => {
    setIsLocationLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success
          setLocationPermission("granted");
          
          // In a real app, you would use the coordinates to fetch nearby doctors
          // For demo, just update the location state and use our sample data
          setLocation("Current Location");
          
          toast({
            title: "Location access granted",
            description: "We'll show doctors near your current location.",
          });
          
          setIsLocationLoading(false);
        },
        (error) => {
          // Error or denied
          setLocationPermission("denied");
          toast({
            variant: "destructive",
            title: "Location access denied",
            description: "Please enter your location manually to find nearby doctors."
          });
          setIsLocationLoading(false);
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Geolocation not supported",
        description: "Your browser doesn't support location services. Please enter your location manually."
      });
      setIsLocationLoading(false);
    }
  };
  
  // Filter doctors based on search query and selected specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === "all" || selectedSpecialty === "" || doctor.specialty === selectedSpecialty;
    
    return matchesSearch && matchesSpecialty;
  });
  
  // Get unique specialties for the filter dropdown
  const specialties = Array.from(new Set(doctors.map(doctor => doctor.specialty)));
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would fetch doctors based on the search query and location
    // For demo, we're just filtering the sample data
    toast({
      title: "Search completed",
      description: `Found ${filteredDoctors.length} doctors matching your criteria.`
    });
  };

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
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              Find Healthcare Providers
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Connect with <span className="text-primary">Expert Doctors</span> Near You
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Find qualified healthcare professionals in your area specializing in various fields.
              Book appointments, view profiles, and get the care you need.
            </p>
            
            <div className="glass-card rounded-xl overflow-hidden p-6">
              <form onSubmit={handleSearch}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex-1">
                    <label htmlFor="location" className="block text-sm font-medium mb-2">Your Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-muted-foreground" size={16} />
                      <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter your location"
                        className="pl-10 pr-20"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1.5 h-8 text-xs"
                        onClick={requestLocationAccess}
                        disabled={isLocationLoading}
                      >
                        {isLocationLoading ? (
                          <span className="flex items-center">
                            <span className="mr-1 h-3 w-3 rounded-full bg-primary animate-pulse"></span>
                            Locating...
                          </span>
                        ) : (
                          "Use current"
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <label htmlFor="search" className="block text-sm font-medium mb-2">Specialty or Doctor Name</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 text-muted-foreground" size={16} />
                      <Input
                        id="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search specialists, doctors, or conditions"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-none">
                    <label className="block text-sm font-medium mb-2 opacity-0">Submit</label>
                    <Button type="submit" className="w-full">Search Doctors</Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section 
        id="filters"
        className={`py-8 transition-all duration-1000 transform ${
          isVisible.filters ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="page-container">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold">
              {filteredDoctors.length} Doctors Available
            </h2>
            
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter size={14} />
                Filters
                <Badge className="ml-1 h-5 w-5 rounded-full text-xs p-0 flex items-center justify-center">
                  {selectedSpecialty ? 1 : 0}
                </Badge>
              </Button>
              
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort By: Relevance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="distance">Distance</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="availability">Availability</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-4 mb-8">
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" className="text-xs flex items-center gap-1.5">
                <Clock size={12} />
                Available Today
                <ChevronDown size={12} />
              </Button>
              <Button variant="outline" size="sm" className="text-xs flex items-center gap-1.5">
                <Clock size={12} />
                Next Available
                <ChevronDown size={12} />
              </Button>
              <Button variant="outline" size="sm" className="text-xs flex items-center gap-1.5">
                <Star size={12} />
                Rating 4.5+
              </Button>
              <Button variant="outline" size="sm" className="text-xs flex items-center gap-1.5">
                <MapPin size={12} />
                Within 5 Miles
                <ChevronDown size={12} />
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                In-person Appointments
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                Video Visits
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                New Patients
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section 
        id="doctors"
        className={`section-padding bg-secondary/50 transition-all duration-1000 transform ${
          isVisible.doctors ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor, index) => (
              <div key={doctor.id}>
                <DoctorCard 
                  doctor={doctor}
                  featured={index === 0}
                />
                <Link to={`/appointment/${doctor.id}`} className="block w-full">
                  <Button className="w-full mt-4">Book Appointment</Button>
                </Link>
              </div>
            ))}
          </div>
          
          {filteredDoctors.length === 0 && (
            <div className="glass-card rounded-xl p-8 text-center">
              <h3 className="text-xl font-bold mb-2">No doctors found</h3>
              <p className="text-muted-foreground mb-4">
                We couldn't find any doctors matching your criteria. Try broadening your search or clearing filters.
              </p>
              <Button onClick={() => {
                setSearchQuery("");
                setSelectedSpecialty("");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Appointment Process Section */}
      <section className="section-padding">
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Easy steps to connect with healthcare professionals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search size={32} />,
                title: "Find a Doctor",
                description: "Search for doctors by specialty, location, or availability.",
                color: "bg-primary/10 text-primary"
              },
              {
                icon: <Calendar size={32} />,
                title: "Book Appointment",
                description: "Select a convenient time slot and book your appointment online.",
                color: "bg-accent/10 text-accent"
              },
              {
                icon: <AlarmClock size={32} />,
                title: "Get Care",
                description: "Receive quality healthcare from experienced professionals.",
                color: "bg-blue-400/10 text-blue-500"
              }
            ].map((step, index) => (
              <div key={index} className="glass-card rounded-xl p-8 text-center card-hover">
                <div className={`mx-auto w-16 h-16 rounded-full ${step.color} flex items-center justify-center mb-6`}>
                  {step.icon}
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-muted-foreground/20 flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      


      {/* FAQ Section */}
      <section className="section-padding bg-secondary/50">
        <div className="page-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Common questions about finding and booking appointments with doctors
              </p>
            </div>
            
            <Accordion type="single" collapsible className="glass-card rounded-xl p-6">
              {[
                {
                  question: "How do I find a doctor who accepts my insurance?",
                  answer: "When searching for doctors, you can filter by insurance providers to see only those who accept your plan. Each doctor's profile also lists the insurance plans they accept. If you're unsure, you can contact the doctor's office directly to confirm."
                },
                {
                  question: "Can I book appointments for someone else?",
                  answer: "Yes, you can book appointments for family members or dependents. During the booking process, you'll have the option to indicate who the appointment is for. Make sure to provide the correct patient information for the person who will be seeing the doctor."
                },
                {
                  question: "What if I need to reschedule or cancel my appointment?",
                  answer: "You can reschedule or cancel your appointment through your account dashboard up to 24 hours before the scheduled time without any penalty. For changes within 24 hours, please contact the doctor's office directly. Some providers may have specific cancellation policies."
                },
                {
                  question: "How do virtual appointments work?",
                  answer: "Virtual appointments are conducted through secure video conferencing. After booking, you'll receive a link to join the meeting at the scheduled time. Make sure your device has a camera and microphone, and you're in a quiet, well-lit space with a stable internet connection for the best experience."
                },
                {
                  question: "What information do I need to provide when booking an appointment?",
                  answer: "When booking, you'll typically need to provide your contact information, insurance details, reason for visit, and brief medical history. For new patients, you may need to complete additional intake forms before your first appointment. All information is securely protected in compliance with privacy regulations."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-bold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="page-container">
          <div className="glass-card rounded-xl p-8 md:p-12 text-center max-w-4xl mx-auto card-hover">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Health Guidance?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Not sure which specialist you need? Our health assistant can help guide you to the right
              type of healthcare professional based on your symptoms or concerns.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/chat" className="group">
                  Chat with Health Assistant
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                Browse Health Articles
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
