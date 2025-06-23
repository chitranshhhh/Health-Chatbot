import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, UserCircle } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth()

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
  

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Mental Health", path: "/mental-health" },
    { name: "General Health", path: "/general-health" },
    ...(user ? [
      { name: "Chat", path: "/chat" },
      { name: "Find Doctor", path: "/find-doctor" }
    ] : [])
  ];
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="page-container py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-display font-bold text-primary flex items-center gap-2"
          >
            <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
              H
            </span>
            <span>HealthHive</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? "text-white bg-primary"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="ml-4 flex items-center space-x-2">
              <ThemeToggle />
              
              {user ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/profile')}
                  >
                    <UserCircle className="h-5 w-5 mr-2" />
                    Profile
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => navigate('/signup')}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="ml-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        {/* Mobile Navigation Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}>
          <div className="flex flex-col space-y-3 pt-2 pb-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-3 rounded-md text-sm font-medium transition-all ${
                  location.pathname === item.path
                    ? "bg-primary text-white"
                    : "hover:bg-secondary"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {user ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/profile')}
                  className="justify-start"
                >
                  <UserCircle className="h-5 w-5 mr-2" />
                  Profile
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="justify-start"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/login')}
                  className="justify-start"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate('/signup')}
                  className="justify-start"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}