import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Trophy,
  Medal,
  Star,
  Flame,
  Crown,
  Award,
  TrendingUp,
  Users,
} from "lucide-react";

const leaderboardData = [
  {
    rank: 1,
    name: "Ananya Sharma",
    avatar: "AS",
    points: 2450,
    sessions: 45,
    answers: 89,
    badges: ["Top Mentor", "100 Sessions"],
    branch: "Computer Science",
    streak: 28,
    change: 0,
  },
  {
    rank: 2,
    name: "Vikram Patel",
    avatar: "VP",
    points: 2120,
    sessions: 38,
    answers: 72,
    badges: ["Rising Star"],
    branch: "Electronics",
    streak: 15,
    change: 2,
  },
  {
    rank: 3,
    name: "Sneha Reddy",
    avatar: "SR",
    points: 1980,
    sessions: 32,
    answers: 65,
    badges: ["Helpful"],
    branch: "Information Technology",
    streak: 21,
    change: -1,
  },
  {
    rank: 4,
    name: "Arjun Mehta",
    avatar: "AM",
    points: 1850,
    sessions: 28,
    answers: 58,
    badges: ["Quick Responder"],
    branch: "Computer Science",
    streak: 12,
    change: 1,
  },
  {
    rank: 5,
    name: "Priya Gupta",
    avatar: "PG",
    points: 1720,
    sessions: 25,
    answers: 52,
    badges: ["Expert"],
    branch: "Computer Science",
    streak: 9,
    change: -2,
  },
  {
    rank: 6,
    name: "Rahul Kumar",
    avatar: "RK",
    points: 1580,
    sessions: 22,
    answers: 45,
    badges: [],
    branch: "Mechanical",
    streak: 5,
    change: 3,
  },
  {
    rank: 7,
    name: "Kavya Singh",
    avatar: "KS",
    points: 1450,
    sessions: 18,
    answers: 38,
    badges: [],
    branch: "Civil",
    streak: 7,
    change: 0,
  },
  {
    rank: 8,
    name: "Aditya Verma",
    avatar: "AV",
    points: 1320,
    sessions: 15,
    answers: 32,
    badges: [],
    branch: "Electronics",
    streak: 4,
    change: 1,
  },
];

const departments = [
  { id: "all", label: "All Departments" },
  { id: "cse", label: "Computer Science" },
  { id: "ece", label: "Electronics" },
  { id: "it", label: "Information Technology" },
  { id: "me", label: "Mechanical" },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-6 h-6 text-yellow-500" />;
    case 2:
      return <Medal className="w-6 h-6 text-gray-400" />;
    case 3:
      return <Medal className="w-6 h-6 text-amber-600" />;
    default:
      return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
  }
};

const getRankBg = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-gradient-to-r from-yellow-500/20 to-amber-500/10 border-yellow-500/30";
    case 2:
      return "bg-gradient-to-r from-gray-300/20 to-gray-400/10 border-gray-400/30";
    case 3:
      return "bg-gradient-to-r from-amber-600/20 to-orange-500/10 border-amber-600/30";
    default:
      return "";
  }
};

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("weekly");

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
        {/* Title */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary mb-4"
          >
            <Trophy className="w-8 h-8 text-primary-foreground" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
          <p className="text-muted-foreground">
            Top mentors making a difference in our community
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="flex items-end justify-center gap-4 mb-8">
          {[2, 1, 3].map((position) => {
            const user = leaderboardData.find((u) => u.rank === position)!;
            const heights = { 1: "h-32", 2: "h-24", 3: "h-20" };
            const avatarSizes = { 1: "w-20 h-20", 2: "w-16 h-16", 3: "w-14 h-14" };

            return (
              <motion.div
                key={position}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: position * 0.1 }}
                className="flex flex-col items-center"
              >
                <Avatar
                  className={`${avatarSizes[position as keyof typeof avatarSizes]} border-4 ${
                    position === 1
                      ? "border-yellow-500"
                      : position === 2
                      ? "border-gray-400"
                      : "border-amber-600"
                  } mb-2`}
                >
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
                <p className="font-semibold text-sm mb-1">{user.name}</p>
                <p className="text-xs text-muted-foreground mb-2">
                  {user.points} pts
                </p>
                <div
                  className={`${heights[position as keyof typeof heights]} w-24 rounded-t-xl ${
                    position === 1
                      ? "gradient-primary"
                      : position === 2
                      ? "bg-gray-300 dark:bg-gray-600"
                      : "bg-amber-600"
                  } flex items-center justify-center`}
                >
                  {getRankIcon(position)}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="weekly">This Week</TabsTrigger>
            <TabsTrigger value="monthly">This Month</TabsTrigger>
            <TabsTrigger value="alltime">All Time</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, label: "Total Mentors", value: "156" },
            { icon: Star, label: "Total Sessions", value: "2.4K" },
            { icon: Award, label: "Badges Earned", value: "890" },
            { icon: Flame, label: "Active Streaks", value: "78" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card variant="elevated" className="p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Full Leaderboard */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Rankings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {leaderboardData.map((user, i) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-4 p-4 rounded-xl border ${getRankBg(
                  user.rank
                )} ${user.rank > 3 ? "border-border" : ""}`}
              >
                <div className="w-10 flex items-center justify-center">
                  {getRankIcon(user.rank)}
                </div>

                <Avatar className="border-2 border-primary/30">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold truncate">{user.name}</p>
                    {user.badges.slice(0, 1).map((badge) => (
                      <Badge
                        key={badge}
                        variant="secondary"
                        className="text-xs hidden sm:inline-flex"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {user.branch} • {user.sessions} sessions
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-primary">{user.points}</p>
                  <p className="text-xs text-muted-foreground">points</p>
                </div>

                <div className="flex items-center gap-1 w-12">
                  {user.change > 0 ? (
                    <span className="text-green-500 text-sm flex items-center">
                      ↑{user.change}
                    </span>
                  ) : user.change < 0 ? (
                    <span className="text-red-500 text-sm flex items-center">
                      ↓{Math.abs(user.change)}
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-sm">-</span>
                  )}
                </div>

                <div className="hidden md:flex items-center gap-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium">{user.streak}</span>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Your Rank Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <Card variant="glass" className="p-4 border-primary/20">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">#42</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold">Your Current Rank</p>
                <p className="text-sm text-muted-foreground">
                  450 points • Keep going! 50 more to reach #40
                </p>
              </div>
              <Button variant="hero" size="sm">
                Improve Rank
              </Button>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
