
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme} 
      className="relative overflow-hidden rounded-full w-10 h-10"
    >
      <Sun className={`h-5 w-5 absolute transition-all duration-500 ${
        theme === 'light' 
          ? 'opacity-100 rotate-0 transform-none' 
          : 'opacity-0 rotate-90 translate-x-10'
      }`} />
      <Moon className={`h-5 w-5 absolute transition-all duration-500 ${
        theme === 'dark' 
          ? 'opacity-100 rotate-0 transform-none' 
          : 'opacity-0 -rotate-90 -translate-x-10'
      }`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
