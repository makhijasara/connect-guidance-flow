import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import {
  ArrowLeft,
  Search,
  Star,
  MessageCircle,
  Calendar,
  Filter,
  CheckCircle2,
  Briefcase,
  GraduationCap,
} from "lucide-react";

const mentors = [
  {
    id: 1,
    name: "Ananya Sharma",
    role: "SDE at Google",
    type: "alumni",
    branch: "Computer Science",
    year: "2022 Batch",
    rating: 4.9,
    sessions: 45,
    reviews: 38,
    skills: ["DSA", "System Design", "Interview Prep", "React"],
    avatar: "AS",
    isVerified: true,
    experience: "3 years at Google, Ex-Amazon",
    linkedin: "https://linkedin.com",
  },
  {
    id: 2,
    name: "Vikram Patel",
    role: "4th Year Student",
    type: "senior",
    branch: "Electronics & Communication",
    year: "4th Year",
    rating: 4.7,
    sessions: 28,
    reviews: 22,
    skills: ["Embedded Systems", "IoT", "GATE Prep", "Arduino"],
    avatar: "VP",
    isVerified: true,
    experience: "Internship at Texas Instruments",
    linkedin: "https://linkedin.com",
  },
  {
    id: 3,
    name: "Sneha Reddy",
    role: "PM at Microsoft",
    type: "alumni",
    branch: "Information Technology",
    year: "2021 Batch",
    rating: 4.8,
    sessions: 32,
    reviews: 28,
    skills: ["Product Management", "Case Studies", "Leadership", "UI/UX"],
    avatar: "SR",
    isVerified: true,
    experience: "4 years in Product, Ex-Flipkart",
    linkedin: "https://linkedin.com",
  },
  {
    id: 4,
    name: "Arjun Mehta",
    role: "3rd Year Student",
    type: "senior",
    branch: "Computer Science",
    year: "3rd Year",
    rating: 4.5,
    sessions: 15,
    reviews: 12,
    skills: ["Web Development", "DSA", "Python", "Machine Learning"],
    avatar: "AM",
    isVerified: false,
    experience: "2 Internships completed",
    linkedin: "https://linkedin.com",
  },
  {
    id: 5,
    name: "Priya Gupta",
    role: "Data Scientist at Meta",
    type: "alumni",
    branch: "Computer Science",
    year: "2020 Batch",
    rating: 4.9,
    sessions: 52,
    reviews: 45,
    skills: ["Machine Learning", "Data Science", "Python", "Statistics"],
    avatar: "PG",
    isVerified: true,
    experience: "5 years in ML, PhD from IIT",
    linkedin: "https://linkedin.com",
  },
];

const filters = [
  { id: "all", label: "All" },
  { id: "alumni", label: "Alumni" },
  { id: "senior", label: "Seniors" },
];

const branches = [
  "All Branches",
  "Computer Science",
  "Electronics",
  "Information Technology",
  "Mechanical",
];

export default function Mentors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedBranch, setSelectedBranch] = useState("All Branches");

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesFilter =
      activeFilter === "all" || mentor.type === activeFilter;
    const matchesBranch =
      selectedBranch === "All Branches" || mentor.branch === selectedBranch;
    return matchesSearch && matchesFilter && matchesBranch;
  });

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <ThemeToggle />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <Logo />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Title & Search */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Find Mentors</h1>
          <p className="text-muted-foreground">
            Connect with experienced seniors and placed alumni
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          >
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>

        {/* Mentors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor, i) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card variant="elevated" className="overflow-hidden h-full">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-14 h-14 border-2 border-primary">
                      <AvatarFallback className="bg-primary/10 text-primary text-lg">
                        {mentor.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold truncate">{mentor.name}</h3>
                        {mentor.isVerified && (
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        {mentor.type === "alumni" ? (
                          <Briefcase className="w-3.5 h-3.5" />
                        ) : (
                          <GraduationCap className="w-3.5 h-3.5" />
                        )}
                        {mentor.role}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {mentor.branch} • {mentor.year}
                      </p>
                    </div>
                  </div>

                  {/* Experience */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {mentor.experience}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mentor.skills.slice(0, 4).map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium text-foreground">
                        {mentor.rating}
                      </span>
                      ({mentor.reviews})
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {mentor.sessions} sessions
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageCircle className="w-4 h-4" />
                      Chat
                    </Button>
                    <Button variant="hero" size="sm" className="flex-1">
                      <Calendar className="w-4 h-4" />
                      Book Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No mentors found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}
