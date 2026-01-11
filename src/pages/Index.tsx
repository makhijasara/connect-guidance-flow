import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import campusBg from "@/assets/campus-bg.jpg";
import { 
  Users, 
  MessageCircle, 
  Award, 
  Sparkles, 
  ChevronRight,
  GraduationCap,
  Target,
  Shield
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const features = [
  {
    icon: Users,
    title: "Peer Mentorship",
    description: "Connect with seniors and alumni for personalized guidance"
  },
  {
    icon: MessageCircle,
    title: "Real-time Q&A",
    description: "Get instant answers to your academic and career doubts"
  },
  {
    icon: Award,
    title: "Earn Recognition",
    description: "Build your profile with badges, points, and certificates"
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Smart mentor matching and session summaries with Gemini AI"
  }
];

const stats = [
  { value: "500+", label: "Active Mentors" },
  { value: "2000+", label: "Students Helped" },
  { value: "10K+", label: "Questions Answered" },
  { value: "4.9", label: "Average Rating" }
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={campusBg} 
            alt="College Campus" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <Logo size="large" />
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-gradient">Knowledge</span> cancels{" "}
              <span className="text-foreground">fear</span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
            >
              A trusted peer-to-peer mentorship platform connecting juniors with experienced 
              seniors and placed alumni for academic guidance, career advice, and personal growth.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 mb-16"
            >
              <Button variant="hero" size="xl" asChild>
                <Link to="/signup">
                  <GraduationCap className="w-5 h-5" />
                  Join as Junior
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline-hero" size="xl" asChild>
                <Link to="/signup?role=mentor">
                  <Target className="w-5 h-5" />
                  Become a Mentor
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-3xl"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary flex items-start justify-center p-2">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to <span className="text-gradient">succeed</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform combines peer mentorship with AI-powered tools to accelerate your learning journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group p-6 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="relative overflow-hidden rounded-3xl gradient-hero p-12 md:p-16 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyem0tNiA2di00aC0ydjRoMnptMC02di00aC0ydjRoMnptLTYgNnYtNGgtMnY0aDJ6bTAtNnYtNGgtMnY0aDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
            
            <div className="relative z-10">
              <Shield className="w-16 h-16 mx-auto mb-6 text-primary-foreground opacity-80" />
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to start your journey?
              </h2>
              <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
                Join thousands of students who are already learning, growing, and succeeding together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="glass" size="lg" asChild className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground">
                  <Link to="/login">
                    Login
                  </Link>
                </Button>
                <Button variant="glass" size="lg" asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  <Link to="/signup">
                    Get Started Free
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              © 2024 Common Thread. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Features
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
