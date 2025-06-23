import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

type DoctorData = {
  id: string;
  name: string;
  specialty: string;
  image: string;
  location: string;
  availability: {
    days: string[];
    times: string[];
  };
  insuranceAccepted: string[];
};

const doctorsData: Record<string, DoctorData> = {
  "dr-smith": {
    id: "dr-smith",
    name: "Dr. Emily Smith",
    specialty: "Psychiatrist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
    location: "123 Medical Center, New York, NY",
    availability: {
      days: ["Monday", "Tuesday", "Thursday"],
      times: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"]
    },
    insuranceAccepted: ["Blue Cross", "Aetna", "United Healthcare"]
  },
  "dr-jones": {
    id: "dr-jones",
    name: "Dr. Michael Jones",
    specialty: "General Practitioner",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
    location: "456 Health Plaza, New York, NY",
    availability: {
      days: ["Monday", "Wednesday", "Friday"],
      times: ["8:00 AM", "9:00 AM", "10:00 AM", "1:00 PM", "2:00 PM"]
    },
    insuranceAccepted: ["Blue Cross", "Cigna", "Medicare"]
  }
};

export default function BookAppointment() {
  const { doctorId } = useParams<{ doctorId: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Get doctor data based on the URL parameter
  const doctor = doctorsData[doctorId || ""] || doctorsData["dr-smith"]; // Default to Dr. Smith if not found
  
  const form = useForm({
    defaultValues: {
      day: "",
      time: "",
      visitType: "in-person",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      insurance: "",
      reason: ""
    }
  });

  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Appointment data:", data);
      setIsSubmitting(false);
      
      toast({
        title: "Appointment Scheduled",
        description: `Your appointment with ${doctor.name} on ${data.day} at ${data.time} has been confirmed.`,
      });
      
      form.reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="page-container">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/find-doctor">
            <ChevronLeft size={16} className="mr-1" /> Back to Find Doctor
          </Link>
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Doctor Information */}
          <div className="md:col-span-1">
            <Card className="glass-card sticky top-24">
              <CardHeader>
                <CardTitle>Provider Information</CardTitle>
                <CardDescription>Booking appointment with</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{doctor.name}</h3>
                    <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin size={18} className="text-muted-foreground mt-0.5" />
                    <p className="text-sm">{doctor.location}</p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Calendar size={18} className="text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Available Days</p>
                      <p className="text-sm text-muted-foreground">
                        {doctor.availability.days.join(", ")}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Clock size={18} className="text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Insurance Accepted</p>
                      <p className="text-sm text-muted-foreground">
                        {doctor.insuranceAccepted.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Appointment Booking Form */}
          <div className="md:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Book an Appointment</CardTitle>
                <CardDescription>
                  Please fill out the form below to schedule your appointment with {doctor.name}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Appointment Details</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="day"
                          rules={{ required: "Please select a day" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Day</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a day" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {doctor.availability.days.map(day => (
                                    <SelectItem key={day} value={day}>
                                      {day}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="time"
                          rules={{ required: "Please select a time" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Time</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a time" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {doctor.availability.times.map(time => (
                                    <SelectItem key={time} value={time}>
                                      {time}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="visitType"
                        rules={{ required: "Please select a visit type" }}
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Visit Type</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="in-person" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    In-person Visit
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="virtual" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Virtual Visit
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Personal Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          rules={{ required: "First name is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your first name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="lastName"
                          rules={{ required: "Last name is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your last name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          rules={{ 
                            required: "Email is required",
                            pattern: {
                              value: /\S+@\S+\.\S+/,
                              message: "Invalid email address"
                            }
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          rules={{ required: "Phone number is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="insurance"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Insurance Provider</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select insurance (optional)" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {doctor.insuranceAccepted.map(insurance => (
                                    <SelectItem key={insurance} value={insurance}>
                                      {insurance}
                                    </SelectItem>
                                  ))}
                                  <SelectItem value="other">Other</SelectItem>
                                  <SelectItem value="none">None / Self-pay</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Select your insurance provider if applicable.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="reason"
                        rules={{ required: "Reason for visit is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reason for Visit</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Briefly describe the reason for your appointment" 
                                className="resize-none" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Please provide a brief description of your symptoms or concerns.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <CardFooter className="px-0 pb-0">
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}