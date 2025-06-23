
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { Navbar } from "@/components/Navbar";
import Index from "./pages/Index";
import MentalHealth from "./pages/MentalHealth";
import GeneralHealth from "./pages/GeneralHealth";
import MentalHealthResources from "./pages/MentalHealthResources"; 
import MentalHealthTopic from "./pages/MentalHealthTopic";
import ChatBot from "./pages/ChatBot";
import FindDoctor from "./pages/FindDoctor";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MentalHealthAssessment from "./pages/MentalHealthAssessment";
import GeneralHealthAssessment from "./pages/GeneralHealthAssessment";
import Appointment from "./pages/BookAppointment";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/UserProfile";
import { AuthProvider } from "@/context/AuthContext";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/mental-health" element={<MentalHealth />} />
              <Route path="/general-health" element={<GeneralHealth />} />
              <Route path="/mental-health/all-resources" element={<MentalHealthResources />} />
              <Route path="/mental-health/:topicId" element={<MentalHealthTopic />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected Routes */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/chat" element={
                <ProtectedRoute>
                  <ChatBot />
                </ProtectedRoute>
              } />
              <Route path="/mental-health/assessment" element={
                <ProtectedRoute>
                  <MentalHealthAssessment />
                </ProtectedRoute>
              } />
                <Route path="/mental-health/assessment/:testType" element={
    <ProtectedRoute>
      <MentalHealthAssessment />
    </ProtectedRoute>
  } />
              <Route path="/general-health/assessment" element={
                <ProtectedRoute>
                  <GeneralHealthAssessment />
                </ProtectedRoute>
              } />
              <Route path="/find-doctor" element={
                <ProtectedRoute>
                  <FindDoctor />
                </ProtectedRoute>
              } />
              <Route path="/appointment/:id" element={<Appointment />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;