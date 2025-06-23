import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronLeft, 
  Search, 
  BookOpen, 
  Video, 
  Headphones, 
  ExternalLink,
  ArrowRight,
  Brain,
  Heart,
  Users,
  Moon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "article" | "video" | "podcast" | "tool";
  category: string[];
  url: string;
  image?: string;
  source: string;
  featured?: boolean;
}

const ResourceCard = ({ resource }: { resource: Resource }) => {
  return (
    <Card className="glass-card card-hover h-full">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="capitalize">
            {resource.type}
          </Badge>
          <div className="text-xs text-muted-foreground">{resource.source}</div>
        </div>
        <CardTitle className="line-clamp-2">{resource.title}</CardTitle>
        <CardDescription className="line-clamp-3">{resource.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="outline" asChild className="w-full">
          <Link to={resource.url} className="group">
            View Resource
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const resources: Resource[] = [
  {
    id: "res-1",
    title: "Understanding Anxiety Disorders: Types, Symptoms, and Treatments",
    description: "A comprehensive guide to different types of anxiety disorders, their symptoms, and evidence-based treatment options.",
    type: "article",
    category: ["anxiety", "disorders"],
    url: "/mental-health/anxiety",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    source: "Mental Health Association",
    featured: true
  },
  {
    id: "res-2",
    title: "Managing Depression: Effective Coping Strategies",
    description: "Learn about evidence-based approaches to managing depression symptoms and improving mood.",
    type: "article",
    category: ["depression", "mood disorders"],
    url: "/mental-health/depression",
    image: "https://images.unsplash.com/photo-1542284889-5e579999891e",
    source: "Depression Research Center"
  },
  {
    id: "res-3",
    title: "Introduction to Mindfulness Meditation",
    description: "A 15-minute guided mindfulness meditation practice for beginners, with explanation of key concepts.",
    type: "video",
    category: ["mindfulness", "meditation"],
    url: "/mental-health/mindfulness",
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2",
    source: "Mindfulness Institute"
  },
  {
    id: "res-4",
    title: "Improving Sleep Quality for Better Mental Health",
    description: "Practical strategies to improve sleep habits and address common sleep problems.",
    type: "article",
    category: ["sleep", "wellness"],
    url: "/mental-health/sleep",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55",
    source: "Sleep and Mental Health Foundation"
  },
  {
    id: "res-5",
    title: "The Science of Stress and How to Manage It",
    description: "Understanding the physiological stress response and evidence-based techniques for stress management.",
    type: "video",
    category: ["stress", "self-care"],
    url: "/mental-health/stress",
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2",
    source: "Stress Research Center",
    featured: true
  },
  {
    id: "res-6",
    title: "Building Resilience: Bouncing Back from Setbacks",
    description: "Learn practical skills to build psychological resilience and cope with life's challenges.",
    type: "article",
    category: ["resilience", "coping skills"],
    url: "/mental-health/resilience",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    source: "Positive Psychology Institute"
  },
  {
    id: "res-7",
    title: "The Mind-Body Connection: How Physical Exercise Impacts Mental Health",
    description: "The science behind exercise's effects on mood, anxiety, and cognitive function.",
    type: "podcast",
    category: ["exercise", "wellness"],
    url: "/mental-health/exercise",
    image: "https://images.unsplash.com/photo-1517836357463-dcaaa9c3c0d5",
    source: "Health Mind Podcast"
  },
  {
    id: "res-8",
    title: "Understanding Panic Attacks: What They Are and How to Cope",
    description: "An explanation of panic attacks, their symptoms, and strategies for managing them when they occur.",
    type: "article",
    category: ["anxiety", "panic attacks"],
    url: "/mental-health/panic-attacks",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    source: "Anxiety Research Foundation"
  },
  {
    id: "res-9",
    title: "Finding the Right Therapist: A Guide to Different Therapy Types",
    description: "An overview of different therapy approaches and how to find the right mental health professional for your needs.",
    type: "article",
    category: ["therapy", "treatment"],
    url: "/mental-health/therapy-types",
    image: "https://images.unsplash.com/photo-1573497491765-55a64301e91f",
    source: "Mental Health Access Project"
  },
  {
    id: "res-10",
    title: "Coping with Grief and Loss",
    description: "Understanding the grief process and healthy ways to cope with loss and bereavement.",
    type: "podcast",
    category: ["grief", "emotional health"],
    url: "/mental-health/grief",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5",
    source: "Psychological Support Network"
  },
  {
    id: "res-11",
    title: "Self-Compassion Practices for Mental Wellbeing",
    description: "Guided exercises to develop self-compassion and reduce self-criticism.",
    type: "video",
    category: ["self-compassion", "mindfulness"],
    url: "/mental-health/self-compassion",
    image: "https://images.unsplash.com/photo-1515940175183-6b248ca0974b",
    source: "Compassionate Mind Foundation"
  },
  {
    id: "res-12",
    title: "Mental Health Mood Tracker Tool",
    description: "A digital tool to track your mood patterns, identify triggers, and monitor your mental wellbeing over time.",
    type: "tool",
    category: ["self-monitoring", "mood tracking"],
    url: "/mental-health/mood-tracker",
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2",
    source: "Digital Mental Health Tools"
  }
];

export default function MentalHealthResources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredResources, setFilteredResources] = useState<Resource[]>(resources);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({
    header: false,
    content: false
  });

  // Animation on scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["header", "content"];
      
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

  // Filter resources based on search query and category
  useEffect(() => {
    let filtered = resources;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(query) || 
        resource.description.toLowerCase().includes(query) ||
        resource.category.some(cat => cat.toLowerCase().includes(query))
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(resource => resource.category.includes(selectedCategory));
    }
    
    setFilteredResources(filtered);
  }, [searchQuery, selectedCategory]);

  // Get unique categories from resources
  const categories = Array.from(new Set(resources.flatMap(resource => resource.category)));

  // Filter resources by type for tabs
  const articleResources = filteredResources.filter(r => r.type === "article");
  const videoResources = filteredResources.filter(r => r.type === "video");
  const podcastResources = filteredResources.filter(r => r.type === "podcast");
  const toolResources = filteredResources.filter(r => r.type === "tool");

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="page-container">
        {/* Header Section */}
        <div className="mb-8" id="header">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/mental-health">
              <ChevronLeft size={16} className="mr-1" /> Back to Mental Health
            </Link>
          </Button>
          
          <div className={`max-w-3xl mx-auto transition-all duration-1000 transform ${
            isVisible.header ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              Mental Health Resources
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Mental Wellbeing Resource Library
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore our curated collection of evidence-based articles, videos, podcasts, and tools
              to support your mental health journey. All resources have been reviewed by mental health
              professionals for accuracy and quality.
            </p>
            
            <div className="glass-card rounded-xl p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 text-muted-foreground" size={16} />
                  <Input
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={selectedCategory === "" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedCategory("")}
                  >
                    All Topics
                  </Button>
                  {categories.slice(0, 5).map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                  ))}
                  {categories.length > 5 && (
                    <Button variant="outline" size="sm">
                      More +
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div 
          id="content" 
          className={`transition-all duration-1000 transform ${
            isVisible.content ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Featured Resources */}
          {!selectedCategory && !searchQuery && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Featured Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.filter(res => res.featured).map((resource) => (
                  <Card key={resource.id} className="glass-card card-hover h-full overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={resource.image} 
                        alt={resource.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="capitalize">
                          {resource.type}
                        </Badge>
                        <div className="text-xs text-muted-foreground">{resource.source}</div>
                      </div>
                      <CardTitle>{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="default" asChild className="w-full">
                        <Link to={resource.url} className="group">
                          View Resource
                          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* All Resources */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Resources</h2>
              <div className="text-sm text-muted-foreground">
                {filteredResources.length} resources found
              </div>
            </div>
            
            <Tabs defaultValue="all">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Resources</TabsTrigger>
                <TabsTrigger value="articles" className="flex items-center gap-1">
                  <BookOpen size={14} /> Articles
                </TabsTrigger>
                <TabsTrigger value="videos" className="flex items-center gap-1">
                  <Video size={14} /> Videos
                </TabsTrigger>
                <TabsTrigger value="podcasts" className="flex items-center gap-1">
                  <Headphones size={14} /> Podcasts
                </TabsTrigger>
                <TabsTrigger value="tools" className="flex items-center gap-1">
                  <Brain size={14} /> Tools
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
                
                {filteredResources.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-bold mb-2">No resources found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search or filter criteria.
                    </p>
                    <Button onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("");
                    }}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="articles">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articleResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
                
                {articleResources.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-bold mb-2">No articles found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search or filter criteria.
                    </p>
                    <Button onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("");
                    }}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="videos">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videoResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
                
                {videoResources.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-bold mb-2">No videos found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search or filter criteria.
                    </p>
                    <Button onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("");
                    }}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="podcasts">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {podcastResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
                
                {podcastResources.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-bold mb-2">No podcasts found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search or filter criteria.
                    </p>
                    <Button onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("");
                    }}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="tools">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {toolResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
                
                {toolResources.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-bold mb-2">No tools found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search or filter criteria.
                    </p>
                    <Button onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("");
                    }}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Resources by Category */}
          {!selectedCategory && !searchQuery && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Browse by Topic</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => {
                  const categoryResources = resources.filter(res => res.category.includes(category));
                  let icon;
                  
                  switch(category) {
                    case 'anxiety':
                    case 'depression':
                    case 'mindfulness':
                      icon = <Brain size={12} className="mr-2 text-primary" />;
                      break;
                    case 'self-care':
                    case 'resilience':
                    case 'emotional health':
                      icon = <Heart size={12} className="mr-2 text-primary" />;
                      break;
                    case 'therapy':
                    case 'support groups':
                      icon = <Users size={12} className="mr-2 text-primary" />;
                      break;
                    case 'sleep':
                      icon = <Moon size={12} className="mr-2 text-primary" />;
                      break;
                    default:
                      icon = <Brain size={12} className="mr-2 text-primary" />;
                  }
                  
                  return (
                    <Card key={category} className="glass-card card-hover">
                      <CardHeader>
                        <CardTitle className="capitalize">{category}</CardTitle>
                        <CardDescription>
                          {categoryResources.length} resources available
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {categoryResources.slice(0, 3).map((resource) => (
                            <li key={resource.id} className="text-sm">
                              <Link 
                                to={resource.url} 
                                className="hover:underline flex items-center"
                              >
                                {icon}
                                {resource.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedCategory(category)}>
                          View All {category.charAt(0).toUpperCase() + category.slice(1)} Resources
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* External Resources Section */}
          <div className="mt-16">
            <div className="glass-card rounded-xl p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">External Resources</h2>
                  <p className="text-muted-foreground mb-6">
                    These trusted organizations provide additional mental health resources that you may find helpful.
                  </p>
                  <ul className="space-y-4">
                    {[
                      {
                        name: "National Institute of Mental Health (NIMH)",
                        url: "https://www.nimh.nih.gov/",
                        description: "The lead federal agency for research on mental disorders."
                      },
                      {
                        name: "Mental Health America",
                        url: "https://www.mhanational.org/",
                        description: "Promotes mental health for all through advocacy, education, research, and services."
                      },
                      {
                        name: "American Psychological Association",
                        url: "https://www.apa.org/",
                        description: "Scientific and professional organization representing psychology in the United States."
                      },
                      {
                        name: "National Alliance on Mental Illness (NAMI)",
                        url: "https://www.nami.org/",
                        description: "The nation's largest grassroots mental health organization dedicated to building better lives for Americans affected by mental illness."
                      }
                    ].map((org, index) => (
                      <li key={index} className="p-3 bg-secondary/30 rounded-lg">
                        <h3 className="font-bold flex items-center">
                          {org.name} 
                          <ExternalLink size={14} className="ml-2 text-muted-foreground" />
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">{org.description}</p>
                        <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                          <a href={org.url} target="_blank" rel="noopener noreferrer">
                            Visit Website
                          </a>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Crisis Resources</h2>
                  <p className="text-muted-foreground mb-6">
                    If you or someone you know is experiencing a mental health crisis, please reach out for help immediately.
                  </p>
                  <div className="space-y-4">
                    <div className="p-4 border-l-4 border-destructive bg-destructive/10 rounded-r-lg">
                      <h3 className="font-bold mb-1">National Suicide Prevention Lifeline</h3>
                      <p className="text-lg font-bold mb-1">1-800-273-8255</p>
                      <p className="text-sm mb-2">
                        Available 24 hours a day, 7 days a week. Provides free and confidential support for people in distress, prevention and crisis resources.
                      </p>
                    </div>
                    
                    <div className="p-4 border-l-4 border-destructive bg-destructive/10 rounded-r-lg">
                      <h3 className="font-bold mb-1">Crisis Text Line</h3>
                      <p className="text-lg font-bold mb-1">Text HOME to 741741</p>
                      <p className="text-sm mb-2">
                        Free, 24/7 support via text message. Connect with a trained crisis counselor.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-secondary/30 rounded-lg">
                      <h3 className="font-bold mb-1">Find Local Resources</h3>
                      <p className="text-sm mb-2">
                        Mental health services vary by location. Find resources specific to your area.
                      </p>
                      <Button variant="outline" size="sm" asChild className="w-full">
                        <Link to="/find-doctor">
                          Find Local Mental Health Services
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
