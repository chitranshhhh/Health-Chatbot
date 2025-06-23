
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  location: string;
  distance?: string;
  phone: string;
  email: string;
  availability: string;
  rating: number;
}

interface DoctorCardProps {
  doctor: Doctor;
  featured?: boolean;
}

export function DoctorCard({ doctor, featured = false }: DoctorCardProps) {
  return (
    <div 
      className={`glass-card rounded-xl overflow-hidden card-hover ${
        featured ? 'border-primary/30 dark:border-primary/20' : ''
      }`}
    >
      <div className="relative">
        <img 
          src={doctor.image} 
          alt={doctor.name} 
          className="w-full h-60 object-cover"
        />
        {doctor.distance && (
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium">
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {doctor.distance} away
            </span>
          </div>
        )}
        {featured && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-primary text-white rounded-full text-xs font-bold">
            Featured
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-bold">{doctor.name}</h3>
            <p className="text-muted-foreground">{doctor.specialty}</p>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(doctor.rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <p className="text-sm mb-4 flex items-center gap-1">
          <MapPin size={14} className="text-muted-foreground" />
          {doctor.location}
        </p>
        <p className="text-sm mb-1 flex items-center gap-2">
          <Phone size={14} className="text-muted-foreground" />
          {doctor.phone}
        </p>
        <p className="text-sm mb-4 flex items-center gap-2">
          <Mail size={14} className="text-muted-foreground" />
          {doctor.email}
        </p>
        <div className="flex gap-2 mt-4">
          <Button className="flex-1">Book Appointment</Button>
          <Button variant="outline" className="flex-1">View Profile</Button>
        </div>
      </div>
    </div>
  );
}
