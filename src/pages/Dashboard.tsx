import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Home,
  HelpCircle,
  Users,
  Trophy,
  User,
  Bell,
  Plus,
  Search,
  MessageCircle,
  ThumbsUp,
  Clock,
  Sparkles,
  ChevronRight,
  Star,
  Zap,
  BookOpen,
  Briefcase,
  GraduationCap,
} from "lucide-react";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: HelpCircle, label: "Questions", path: "/questions" },
  { icon: Users, label: "Mentors", path: "/mentors" },
  { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
  { icon: User, label: "Profile", path: "/profile" },
];

const doubts = [
  {
    id: 1,
    title: "How to prepare for TCS NQT exam?",
    description: "I'm in 3rd year CSE. What topics should I focus on for TCS NQT?",
    category: "Placements",
    author: "Rahul K.",
    avatar: "RK",
    time: "2 hours ago",
    answers: 5,
    likes: 12,
    isUrgent: true,
  },
  {
    id: 2,
    title: "Best resources for DSA?",
    description: "Looking for structured DSA learning resources. Currently in 2nd year.",
    category: "Academics",
    author: "Priya S.",
    avatar: "PS",
    time: "4 hours ago",
    answers: 8,
    likes: 24,
    isUrgent: false,
  },
  {
    id: 3,
    title: "How to get internship at Google?",
    description: "What skills and projects should I have for a Google STEP internship?",
    category: "Internships",
    author: "Amit V.",
    avatar: "AV",
    time: "6 hours ago",
    answers: 3,
    likes: 18,
    isUrgent: false,
  },
];

const mentors = [
  {
    id: 1,
    name: "Ananya Sharma",
    role: "SDE at Google",
    branch: "Computer Science",
    rating: 4.9,
    sessions: 45,
    skills: ["DSA", "System Design", "Interview Prep"],
    avatar: "AS",
  },
  {
    id: 2,
    name: "Vikram Patel",
    role: "4th Year, ECE",
    branch: "Electronics",
    rating: 4.7,
    sessions: 28,
    skills: ["Embedded Systems", "IoT", "GATE Prep"],
    avatar: "VP",
  },
  {
    id: 3,
    name: "Sneha Reddy",
    role: "PM at Microsoft",
    branch: "Information Technology",
    rating: 4.8,
    sessions: 32,
    skills: ["Product Management", "Case Studies", "Leadership"],
    avatar: "SR",
  },
];

const leaderboard = [
  { rank: 1, name: "Ananya Sharma", points: 2450, badge: "🏆" },
  { rank: 2, name: "Vikram Patel", points: 2120, badge: "🥈" },
  { rank: 3, name: "Sneha Reddy", points: 1980, badge: "🥉" },
];

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />

          <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search questions, mentors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                3
              </span>
            </Button>
            <Avatar className="h-9 w-9 border-2 border-primary">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[280px_1fr_300px] gap-6">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block space-y-6">
            <Card variant="elevated" className="p-4">
              <div className="flex items-center gap-3 mb-6">
                <Avatar className="h-12 w-12 border-2 border-primary">
                  <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">John Doe</p>
                  <p className="text-sm text-muted-foreground">2nd Year, CSE</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center mb-6">
                <div className="p-2 rounded-lg bg-secondary">
                  <p className="text-lg font-bold text-gradient">450</p>
                  <p className="text-xs text-muted-foreground">Points</p>
                </div>
                <div className="p-2 rounded-lg bg-secondary">
                  <p className="text-lg font-bold text-gradient">12</p>
                  <p className="text-xs text-muted-foreground">Doubts</p>
                </div>
                <div className="p-2 rounded-lg bg-secondary">
                  <p className="text-lg font-bold text-gradient">5</p>
                  <p className="text-xs text-muted-foreground">Sessions</p>
                </div>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setActiveNav(item.label)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      activeNav === item.label
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </Card>

            {/* AI Assistant Card */}
            <Card variant="elevated" className="p-4 gradient-primary text-primary-foreground">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">AI Assistant</span>
              </div>
              <p className="text-sm opacity-90 mb-4">
                Get instant help with your doubts using our AI-powered assistant.
              </p>
              <Button variant="glass" size="sm" className="w-full bg-primary-foreground/20 hover:bg-primary-foreground/30">
                Ask AI
              </Button>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="space-y-6">
            {/* Welcome Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl gradient-hero p-6 text-primary-foreground"
            >
              <h1 className="text-2xl font-bold mb-2">Welcome back, John! 👋</h1>
              <p className="opacity-90 mb-4">Ready to learn something new today?</p>
              <div className="flex gap-3">
                <Button variant="glass" asChild className="bg-primary-foreground/20 hover:bg-primary-foreground/30">
                  <Link to="/ask-doubt">
                    <Plus className="w-4 h-4" />
                    Ask a Doubt
                  </Link>
                </Button>
                <Button variant="glass" asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  <Link to="/mentors">
                    Find Mentors
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: BookOpen, label: "Questions Asked", value: "12", color: "text-blue-500" },
                { icon: MessageCircle, label: "Answers Received", value: "38", color: "text-green-500" },
                { icon: Briefcase, label: "Sessions Completed", value: "5", color: "text-purple-500" },
                { icon: Zap, label: "Current Streak", value: "7 days", color: "text-orange-500" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card variant="elevated" className="p-4">
                    <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Recent Doubts Feed */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Recent Doubts</h2>
                <Link to="/questions" className="text-sm text-primary hover:underline flex items-center gap-1">
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {doubts.map((doubt, i) => (
                  <motion.div
                    key={doubt.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card variant="elevated" className="p-5 hover:shadow-card-hover cursor-pointer">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">{doubt.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold truncate">{doubt.title}</h3>
                            {doubt.isUrgent && (
                              <Badge className="bg-destructive/10 text-destructive border-0">
                                Urgent
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {doubt.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {doubt.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-3.5 h-3.5" />
                              {doubt.answers} answers
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-3.5 h-3.5" />
                              {doubt.likes}
                            </span>
                          </div>
                        </div>
                        <Badge variant="secondary">{doubt.category}</Badge>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="hidden lg:block space-y-6">
            {/* Recommended Mentors */}
            <Card variant="elevated">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  Top Mentors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mentors.map((mentor) => (
                  <div key={mentor.id} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">{mentor.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{mentor.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{mentor.role}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{mentor.rating}</span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/mentors">View All Mentors</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Leaderboard Preview */}
            <Card variant="elevated">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center gap-3 p-2 rounded-lg ${
                      user.rank === 1 ? "bg-yellow-500/10" : "bg-secondary/50"
                    }`}
                  >
                    <span className="text-lg">{user.badge}</span>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.points} pts</p>
                    </div>
                    <span className="text-sm font-bold text-muted-foreground">#{user.rank}</span>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/leaderboard">Full Leaderboard</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/80 backdrop-blur-lg">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setActiveNav(item.label)}
              className={`flex flex-col items-center gap-1 px-3 py-2 ${
                activeNav === item.label ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Floating Ask Button - Mobile */}
      <motion.div
        className="lg:hidden fixed bottom-20 right-4 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <Button variant="hero" size="icon" className="w-14 h-14 rounded-full shadow-glow" asChild>
          <Link to="/ask-doubt">
            <Plus className="w-6 h-6" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
