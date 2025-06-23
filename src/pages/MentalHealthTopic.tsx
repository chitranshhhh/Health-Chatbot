import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ArrowRight, Clock, Calendar, Tag, Share2, BookmarkPlus, ThumbsUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface TopicContent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  content: string[];
  image: string;
  lastUpdated: string;
  readTime: string;
  relatedTopics: string[];
  tags: string[];
  author: {
    name: string;
    credentials: string;
    bio: string;
  };
}

const topicsData: Record<string, TopicContent> = {
  "anxiety": {
    id: "anxiety",
    title: "Understanding and Managing Anxiety",
    subtitle: "A comprehensive guide to recognizing anxiety symptoms and effective management strategies",
    description: "Anxiety is a normal response to stress, but when it becomes excessive or persistent, it can interfere with daily functioning. This guide explores the nature of anxiety disorders, their symptoms, and evidence-based approaches to treatment and management.",
    content: [
      "<h2>What is Anxiety?</h2><p>Anxiety is the body's natural response to stress – a feeling of fear or apprehension about what's to come. It's normal to feel anxious before an important event or during challenging times. However, when anxiety is persistent, overwhelming, and interferes with daily activities, it may be a sign of an anxiety disorder.</p>",
      "<h2>Common Types of Anxiety Disorders</h2><p><strong>Generalized Anxiety Disorder (GAD)</strong>: Characterized by persistent and excessive worry about various things. People with GAD find it difficult to control their worry, which often interferes with daily functioning.</p><p><strong>Social Anxiety Disorder</strong>: Involves intense fear of social or performance situations. People with social anxiety disorder may worry about being judged, embarrassed, or humiliated.</p><p><strong>Panic Disorder</strong>: Characterized by recurrent unexpected panic attacks – sudden periods of intense fear that come on quickly and reach their peak within minutes.</p><p><strong>Specific Phobias</strong>: Involve an intense fear of a specific object or situation, such as heights, flying, or certain animals.</p>",
      "<h2>Physical Symptoms of Anxiety</h2><p>Anxiety isn't just a mental experience – it has physical manifestations as well. Common physical symptoms include:</p><ul><li>Increased heart rate</li><li>Rapid breathing</li><li>Restlessness</li><li>Trouble concentrating</li><li>Difficulty falling asleep</li><li>Muscle tension</li><li>Gastrointestinal problems</li><li>Fatigue</li></ul>",
      "<h2>Evidence-Based Treatments for Anxiety</h2><p><strong>Cognitive Behavioral Therapy (CBT)</strong>: This is one of the most effective treatments for anxiety disorders. CBT helps individuals identify, challenge, and change thought patterns and behaviors that contribute to anxiety.</p><p><strong>Exposure Therapy</strong>: This involves gradually exposing the person to the feared object or context without any danger, in order to help them overcome their anxiety.</p><p><strong>Medication</strong>: Various medications can help manage anxiety symptoms, including antidepressants, anti-anxiety medications, and beta-blockers. These should always be prescribed and monitored by a healthcare provider.</p>",
      "<h2>Self-Help Strategies for Managing Anxiety</h2><p>While professional help is important for managing anxiety disorders, there are also several self-help strategies that can be effective:</p><ul><li><strong>Practice relaxation techniques</strong>: Deep breathing exercises, progressive muscle relaxation, and meditation can help reduce anxiety.</li><li><strong>Stay physically active</strong>: Regular exercise can help reduce anxiety and improve mood.</li><li><strong>Maintain a healthy lifestyle</strong>: Eating a balanced diet, getting enough sleep, and limiting alcohol and caffeine can help manage anxiety symptoms.</li><li><strong>Challenge negative thoughts</strong>: Try to identify and challenge negative thought patterns that contribute to anxiety.</li><li><strong>Connect with others</strong>: Social support can be a powerful buffer against stress and anxiety.</li></ul>",
      "<h2>When to Seek Professional Help</h2><p>It's important to seek professional help if anxiety is:</p><ul><li>Interfering with daily activities like work, school, or relationships</li><li>Causing significant distress</li><li>Leading to avoidance of certain situations</li><li>Accompanied by depression or substance abuse</li><li>Causing thoughts of self-harm or suicide</li></ul><p>Remember, anxiety disorders are highly treatable, and seeking help is a sign of strength, not weakness.</p>"
    ],
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    lastUpdated: "May 15, 2023",
    readTime: "12 min",
    relatedTopics: ["stress", "mindfulness", "depression"],
    tags: ["anxiety", "mental health", "stress management", "therapy"],
    author: {
      name: "Dr. Sarah Johnson",
      credentials: "Ph.D., Clinical Psychology",
      bio: "Dr. Johnson is a licensed clinical psychologist specializing in anxiety disorders with over 15 years of experience in both research and clinical practice."
    }
  },
  "depression": {
    id: "depression",
    title: "Understanding Depression: Symptoms, Causes, and Treatment",
    subtitle: "A comprehensive guide to recognizing depression and exploring effective treatment options",
    description: "Depression is more than just feeling sad – it's a serious mental health condition that affects how you feel, think, and handle daily activities. This guide provides information about the nature of depression, its symptoms, causes, and evidence-based approaches to treatment.",
    content: [
      "<h2>What is Depression?</h2><p>Depression (major depressive disorder) is a common and serious medical illness that negatively affects how you feel, think, and act. It causes feelings of sadness and/or a loss of interest in activities you once enjoyed. It can lead to a variety of emotional and physical problems and can decrease your ability to function at work and at home.</p>",
      "<h2>Common Symptoms of Depression</h2><p>Depression symptoms can vary from mild to severe and may include:</p><ul><li>Persistent sad, anxious, or \"empty\" mood</li><li>Feelings of hopelessness or pessimism</li><li>Irritability</li><li>Feelings of guilt, worthlessness, or helplessness</li><li>Loss of interest or pleasure in hobbies and activities</li><li>Decreased energy or fatigue</li><li>Moving or talking more slowly</li><li>Feeling restless or having trouble sitting still</li><li>Difficulty concentrating, remembering, or making decisions</li><li>Difficulty sleeping, early-morning awakening, or oversleeping</li><li>Appetite and/or weight changes</li><li>Thoughts of death or suicide, or suicide attempts</li><li>Aches or pains, headaches, cramps, or digestive problems without a clear physical cause</li></ul>",
      "<h2>Types of Depression</h2><p><strong>Major Depressive Disorder</strong>: This is what we typically think of when we hear the term \"depression.\" It involves persistent feelings of sadness, hopelessness, and worthlessness that don't go away on their own.</p><p><strong>Persistent Depressive Disorder (Dysthymia)</strong>: This is a depressed mood that lasts for at least two years. A person diagnosed with persistent depressive disorder may have episodes of major depression along with periods of less severe symptoms.</p><p><strong>Seasonal Affective Disorder (SAD)</strong>: This is a type of depression that comes and goes with the seasons, typically starting in the late fall and early winter and going away during the spring and summer.</p><p><strong>Postpartum Depression</strong>: This is much more serious than the \"baby blues\" that many women experience after giving birth. It can interfere with a mother's ability to care for her child and handle other daily tasks.</p>",
      "<h2>Causes and Risk Factors</h2><p>Depression is a complex condition with multiple potential causes:</p><ul><li><strong>Biological factors</strong>: Changes in brain chemistry, hormones, or genetics can contribute to depression.</li><li><strong>Psychological factors</strong>: Personal history of trauma, abuse, or neglect can increase risk. Certain personality traits like low self-esteem or being overly self-critical are also associated with higher risk.</li><li><strong>Environmental factors</strong>: Exposure to violence, neglect, abuse, or poverty may make some people more vulnerable to depression.</li><li><strong>Medical conditions</strong>: Certain conditions like chronic illness, insomnia, chronic pain, or attention-deficit hyperactivity disorder can increase risk.</li></ul>",
      "<h2>Evidence-Based Treatments</h2><p><strong>Psychotherapy</strong>: Different types of psychotherapy, such as cognitive behavioral therapy (CBT), interpersonal therapy (IPT), and problem-solving therapy can help people with depression.</p><p><strong>Medication</strong>: Antidepressants may help improve the way your brain uses certain chemicals that control mood or stress. It may take several weeks for antidepressants to work, and you may need to try several different medications to find one that works for you.</p><p><strong>Brain stimulation therapies</strong>: When treatments such as psychotherapy and medication don't work, brain stimulation therapies such as electroconvulsive therapy (ECT) might be options to explore.</p>",
      "<h2>Self-Help and Coping Strategies</h2><p>While professional treatment is important for depression, there are several self-help strategies that can support recovery:</p><ul><li><strong>Stay connected</strong>: Reach out to family and friends, even if you don't feel like it.</li><li><strong>Get moving</strong>: Regular physical activity can be as effective as medication for mild to moderate depression.</li><li><strong>Eat a healthy diet</strong>: What you eat can impact your mood and energy levels.</li><li><strong>Practice stress reduction</strong>: Techniques like mindfulness, meditation, or yoga can help manage stress.</li><li><strong>Challenge negative thoughts</strong>: Try to identify negative or distorted thinking patterns and reframe them.</li><li><strong>Establish routine</strong>: Structure your day, even when you don't feel like it.</li><li><strong>Set small goals</strong>: Accomplishing even small tasks can help you feel better.</li></ul>",
      "<h2>When to Seek Help</h2><p>If you're experiencing symptoms of depression, it's important to seek help from a mental health professional. This is especially crucial if:</p><ul><li>Your symptoms are interfering with your ability to work, sleep, study, eat, or enjoy life</li><li>You're having thoughts of harming yourself or others</li><li>You've tried self-help strategies but they haven't helped</li></ul><p>Depression is treatable, and most people see improvements in their symptoms when they receive appropriate treatment. Remember, seeking help is a sign of strength, not weakness.</p>"
    ],
    image: "https://images.unsplash.com/photo-1542284889-5e579999891e",
    lastUpdated: "June 3, 2023",
    readTime: "15 min",
    relatedTopics: ["anxiety", "sleep", "self-care"],
    tags: ["depression", "mental health", "mood disorders", "therapy"],
    author: {
      name: "Dr. Michael Chen",
      credentials: "M.D., Psychiatry",
      bio: "Dr. Chen is a board-certified psychiatrist with a special interest in mood disorders. He has over 20 years of clinical experience and has published numerous research papers on depression treatment."
    }
  },
  "stress": {
    id: "stress",
    title: "Effective Stress Management Techniques",
    subtitle: "Evidence-based strategies to reduce stress and improve wellbeing in everyday life",
    description: "Stress is a normal part of life, but chronic stress can have negative effects on your mental and physical health. This guide provides practical strategies for managing stress and building resilience.",
    content: [
      "<h2>Understanding Stress</h2><p>Stress is the body's response to challenges and demands. While a little stress can motivate you to take action, excessive stress can be harmful.</p>",
      "<h2>Common Causes of Stress</h2><p>Work pressure, personal relationships, and environmental factors can all contribute to chronic stress.</p>",
      "<h2>Effective Stress Management Techniques</h2><ul><li>Practice relaxation techniques such as deep breathing and meditation.</li><li>Engage in regular physical activity.</li><li>Maintain a balanced diet and proper sleep schedule.</li><li>Set realistic goals and manage your time effectively.</li><li>Reach out for social support when needed.</li></ul>",
      "<h2>When to Seek Professional Help</h2><p>If stress becomes overwhelming or starts affecting your daily life, consider seeking help from a mental health professional.</p>"
    ],
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2",
    lastUpdated: "April 12, 2023",
    readTime: "14 min",
    relatedTopics: ["anxiety", "mindfulness", "sleep"],
    tags: ["stress", "mental health", "relaxation", "self-care"],
    author: {
      name: "Dr. Rebecca Martinez",
      credentials: "Ph.D., Health Psychology",
      bio: "Dr. Martinez specializes in stress management and mind-body approaches to health. She has conducted research on workplace stress and resilience strategies for over a decade."
    }
  },
  "mindfulness": {
    id: "mindfulness",
    title: "Introduction to Mindfulness Practice",
    subtitle: "Learn how mindfulness can enhance mental wellbeing and reduce stress in daily life",
    description: "Mindfulness is the practice of focusing on the present moment without judgment. It can help reduce stress, improve concentration, and boost overall wellbeing.",
    content: [
      "<h2>What is Mindfulness?</h2><p>Mindfulness involves paying attention to your thoughts, feelings, and sensations in a non-judgmental way.</p>",
      "<h2>Benefits of Practicing Mindfulness</h2><ul><li>Reduces stress and anxiety</li><li>Improves focus and clarity</li><li>Enhances emotional regulation</li></ul>",
      "<h2>How to Get Started</h2><p>Begin with short sessions of meditation or deep breathing. Gradually increase the time as you become more comfortable with the practice.</p>",
      "<h2>Incorporating Mindfulness into Daily Life</h2><p>Try to practice mindfulness during everyday activities, such as eating, walking, or even during conversations.</p>"
    ],
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    lastUpdated: "March 8, 2023",
    readTime: "16 min",
    relatedTopics: ["stress", "meditation", "self-care"],
    tags: ["mindfulness", "meditation", "mental health", "stress reduction"],
    author: {
      name: "Dr. David Thompson",
      credentials: "Ph.D., Clinical Psychology",
      bio: "Dr. Thompson is a psychologist and certified mindfulness teacher with over 20 years of experience integrating mindfulness into clinical practice and everyday life."
    }
  },
  "sleep": {
    id: "sleep",
    title: "Improving Sleep Quality for Better Mental Health",
    subtitle: "Understanding the connection between sleep and mental wellbeing, with practical strategies for better rest",
    description: "Quality sleep is essential for both mental and physical health. This guide explores common sleep challenges and provides evidence-based strategies to improve sleep quality.",
    content: [
      "<h2>The Importance of Sleep</h2><p>Sleep plays a crucial role in maintaining overall health, affecting mood, cognitive function, and physical wellbeing.</p>",
      "<h2>Common Sleep Problems</h2><p>Factors such as stress, poor sleep habits, and an unsuitable sleep environment can contribute to sleep difficulties.</p>",
      "<h2>Tips for Better Sleep</h2><ul><li>Maintain a regular sleep schedule</li><li>Create a calming bedtime routine</li><li>Optimize your sleep environment</li><li>Limit caffeine and screen time before bed</li></ul>",
      "<h2>When to Seek Help</h2><p>If you continue to experience sleep difficulties, consider consulting a sleep specialist or healthcare provider.</p>"
    ],
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55",
    lastUpdated: "May 22, 2023",
    readTime: "18 min",
    relatedTopics: ["stress", "anxiety", "self-care"],
    tags: ["sleep", "mental health", "insomnia", "wellness"],
    author: {
      name: "Dr. Jennifer Williams",
      credentials: "M.D., Sleep Medicine Specialist",
      bio: "Dr. Williams is board-certified in both psychiatry and sleep medicine, with extensive experience in treating sleep disorders and promoting mental health through better sleep."
    }
  },
  "exercise": {
    id: "exercise",
    title: "Exercise & Mental Health: Boosting Your Wellbeing Through Physical Activity",
    subtitle: "Exploring the connection between regular exercise and improved mental health",
    description: "Regular physical activity has profound benefits for both your body and mind. This guide explains how exercise can improve mood, reduce anxiety, and enhance overall mental wellbeing.",
    content: [
      "<h2>The Mental Health Benefits of Exercise</h2><ul><li>Improves mood by releasing endorphins</li><li>Reduces symptoms of anxiety and depression</li><li>Enhances cognitive function and sleep quality</li></ul>",
      "<h2>Types of Exercise</h2><p>Whether it's aerobic exercise, strength training, or yoga, different forms of physical activity can all contribute to better mental health. Choose what suits your interests and lifestyle.</p>",
      "<h2>Getting Started</h2><p>If you're new to exercise, begin slowly and gradually increase your activity. Consult a healthcare provider if you have any concerns.</p>",
      "<h2>Staying Motivated</h2><p>Set realistic goals, track your progress, and consider joining a group or finding an exercise buddy to keep yourself accountable.</p>"
    ],
    image: "https://images.unsplash.com/photo-1518611012118-fd2c41f7a974",
    lastUpdated: "July 10, 2023",
    readTime: "10 min",
    relatedTopics: ["mental health", "stress", "sleep"],
    tags: ["exercise", "mental health", "physical activity", "wellbeing"],
    author: {
      name: "Dr. Alex Morgan",
      credentials: "M.Sc., Exercise Science",
      bio: "Dr. Morgan is an expert in exercise physiology and mental health, dedicated to helping individuals improve their wellbeing through physical activity."
    }
  },
  "support-groups": {
    id: "support-groups",
    title: "Finding and Joining Support Groups for Mental Health",
    subtitle: "How connecting with others can provide support and improve your mental wellbeing",
    description: "Support groups offer a safe space to share experiences and receive support. This guide provides tips on finding a support group that suits your needs and how to make the most of it.",
    content: [
      "<h2>The Value of Support Groups</h2><p>Support groups can help you feel less alone by connecting you with others who face similar challenges.</p>",
      "<h2>Types of Support Groups</h2><p>There are various types, including in-person meetings and online communities, each offering unique benefits.</p>",
      "<h2>How to Find a Support Group</h2><p>Search through local community centers, mental health organizations, or online platforms dedicated to support.</p>",
      "<h2>What to Expect</h2><p>Support groups offer a non-judgmental environment where you can share, listen, and learn coping strategies.</p>"
    ],
    image: "https://images.unsplash.com/photo-1554284126-5010d1c5c1cf",
    lastUpdated: "June 15, 2023",
    readTime: "8 min",
    relatedTopics: ["depression", "anxiety", "self-care"],
    tags: ["support groups", "mental health", "community", "wellbeing"],
    author: {
      name: "Dr. Emily Carter",
      credentials: "M.A., Counseling Psychology",
      bio: "Dr. Carter has extensive experience in facilitating support groups and counseling, helping individuals connect and heal through shared experiences."
    }
  },
  "education": {
    id: "education",
    title: "Mental Health Education: Understanding the Mind",
    subtitle: "Explore the fundamentals of mental health and psychological well-being",
    description: "Mental health education is vital for understanding the complexities of the human mind. This guide covers key concepts in mental health, common disorders, and strategies to maintain psychological wellbeing.",
    content: [
      "<h2>The Importance of Mental Health Education</h2><p>Knowledge about mental health can reduce stigma and empower individuals to seek help when needed.</p>",
      "<h2>Key Concepts in Mental Health</h2><ul><li>The role of neurotransmitters</li><li>The impact of stress on the brain</li><li>Common mental health disorders</li></ul>",
      "<h2>Strategies for Promoting Mental Wellbeing</h2><p>Explore self-care practices, mindfulness techniques, and the importance of professional support.</p>",
      "<h2>Additional Resources</h2><p>Discover books, courses, and online materials to further deepen your understanding of mental health.</p>"
    ],
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad",
    lastUpdated: "July 5, 2023",
    readTime: "12 min",
    relatedTopics: ["anxiety", "depression", "stress"],
    tags: ["education", "mental health", "psychology", "wellbeing"],
    author: {
      name: "Dr. Lisa Brown",
      credentials: "Ph.D., Educational Psychology",
      bio: "Dr. Brown is dedicated to mental health education and has authored several books on understanding psychological wellbeing and promoting mental health awareness."
    }
  }
};

export default function MentalHealthTopic() {
  const { topicId } = useParams<{ topicId: string }>();
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({
    header: false,
    content: false,
    related: false
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const topic = topicsData[topicId || ""] || topicsData["anxiety"]; // Default to anxiety if not found

  useEffect(() => {
    if (!topicId || !topicsData[topicId]) {
      toast({
        title: "Topic not found",
        description: "The requested topic could not be found. Showing default content instead.",
        variant: "destructive",
      });
    }
  }, [topicId, toast]);
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["header", "content", "related"];
      
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

  const relatedTopics = topic.relatedTopics
    .map(id => topicsData[id])
    .filter(Boolean);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "The link to this article has been copied to your clipboard.",
    });
  };

  const handleBookmark = () => {
    toast({
      title: "Article saved",
      description: "This article has been saved to your bookmarks.",
    });
  };

  const handleFeedback = (positive: boolean) => {
    toast({
      title: positive ? "Thank you for your feedback!" : "We appreciate your input",
      description: positive 
        ? "We're glad this article was helpful to you." 
        : "We'll use your feedback to improve our content.",
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="page-container">
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to="/mental-health">Mental Health</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to={`/mental-health/${topic.id}`}>
                    {topic.title.length > 30 ? topic.title.slice(0, 30) + '...' : topic.title}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div 
          id="header" 
          className={`mb-12 transition-all duration-1000 transform ${
            isVisible.header ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock size={14} className="mr-1" /> {topic.readTime} read
              </div>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar size={14} className="mr-1" /> Updated {topic.lastUpdated}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{topic.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{topic.subtitle}</p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {topic.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs capitalize">
                  <Tag size={12} className="mr-1" /> {tag}
                </Badge>
              ))}
            </div>
            
            <div className="relative h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
              <img 
                src={topic.image} 
                alt={topic.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                  {topic.author.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium">{topic.author.name}</p>
                  <p className="text-sm text-muted-foreground">{topic.author.credentials}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" title="Save for later" onClick={handleBookmark}>
                  <BookmarkPlus size={18} />
                </Button>
                <Button variant="ghost" size="icon" title="Share" onClick={handleShare}>
                  <Share2 size={18} />
                </Button>
              </div>
            </div>
            
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              <p className="lead">{topic.description}</p>
            </div>
            
            <Separator className="mb-8" />
          </div>
        </div>
        
        <div 
          id="content" 
          className={`mb-16 transition-all duration-1000 transform ${
            isVisible.content ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {topic.content && topic.content.length > 0 ? (
                topic.content.map((section, index) => (
                  <div key={index} dangerouslySetInnerHTML={{ __html: section }} />
                ))
              ) : (
                <div className="my-10 p-8 bg-secondary/30 rounded-xl text-center">
                  <h3 className="text-xl font-bold mb-4">Content Coming Soon</h3>
                  <p className="mb-6">We're currently working on detailed content for this topic.</p>
                  <p className="mb-8">In the meantime, you can explore our other resources or check back later for updates.</p>
                  <Button onClick={() => navigate('/mental-health')}>
                    Back to Mental Health Resources
                  </Button>
                </div>
              )}
            </div>
            
            <div className="mt-12 flex flex-col md:flex-row gap-6 items-center justify-between p-6 bg-secondary/30 rounded-xl">
              <div>
                <h3 className="text-xl font-bold mb-2">Was this article helpful?</h3>
                <p className="text-muted-foreground">Your feedback helps us improve our content.</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex gap-2 items-center" onClick={() => handleFeedback(true)}>
                  <ThumbsUp size={16} /> Yes, it helped
                </Button>
                <Button variant="outline" className="flex gap-2 items-center" onClick={() => handleFeedback(false)}>
                  <MessageSquare size={16} /> Provide feedback
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div 
          id="related" 
          className={`transition-all duration-1000 transform ${
            isVisible.related ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Related Topics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTopics.map(relatedTopic => (
                <Card key={relatedTopic.id} className="glass-card card-hover">
                  <CardHeader className="pb-3">
                    <CardTitle className="line-clamp-2">{relatedTopic.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{relatedTopic.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Clock size={14} className="mr-1" /> {relatedTopic.readTime} read
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <Link to={`/mental-health/${relatedTopic.id}`} className="group">
                        Read More
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button asChild>
                <Link to="/mental-health/all-resources" className="group">
                  Explore All Mental Health Resources
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
