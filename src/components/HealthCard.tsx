
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface HealthCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  gradient?: string;
}

export function HealthCard({ 
  title, 
  description, 
  icon, 
  to, 
  gradient = "from-blue-500 to-violet-500"
}: HealthCardProps) {
  return (
    <div className="glass-card rounded-xl overflow-hidden card-hover group">
      <div className={`h-2 bg-gradient-to-r ${gradient} w-full`} />
      <div className="p-6">
        <div className="mb-4 text-primary">{icon}</div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Link 
          to={to} 
          className="inline-flex items-center text-primary font-medium group-hover:underline"
        >
          Learn more
          <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
