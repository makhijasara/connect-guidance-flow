import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { AIAssistant } from "@/components/AIAssistant";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Send,
  Sparkles,
  AlertCircle,
  BookOpen,
  Briefcase,
  GraduationCap,
  Heart,
  Code,
  Users,
} from "lucide-react";

const categories = [
  { id: "academics", label: "Academics", icon: BookOpen },
  { id: "placements", label: "Placements", icon: Briefcase },
  { id: "internships", label: "Internships", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Code },
  { id: "campus", label: "Campus Life", icon: Users },
  { id: "mental-health", label: "Mental Health", icon: Heart },
];

export default function AskDoubt() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    isAnonymous: false,
    isUrgent: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Question posted!",
      description: "Your doubt has been submitted. Mentors will respond soon.",
    });

    setIsLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
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

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Ask a Doubt</h1>
            <p className="text-muted-foreground">
              Get help from seniors and alumni. Be specific for better answers.
            </p>
          </div>

          {/* AI Suggestion Banner */}
          <Card variant="glass" className="p-4 mb-6 border-primary/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium mb-1">AI will help you!</p>
                <p className="text-sm text-muted-foreground">
                  Our AI assistant will suggest relevant answers and match you with the best mentors.
                </p>
              </div>
            </div>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Question Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Question Title *</Label>
                  <Input
                    id="title"
                    placeholder="What's your doubt about?"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, title: e.target.value }))
                    }
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Be specific and clear in your title
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <textarea
                    id="description"
                    placeholder="Explain your doubt in detail. Include what you've already tried..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="flex min-h-[150px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                    required
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {formData.description.length} / 1000 characters
                  </p>
                </div>

                {/* Category */}
                <div className="space-y-3">
                  <Label>Category *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, category: cat.id }))
                        }
                        className={`p-3 rounded-xl border-2 transition-all duration-200 flex items-center gap-2 ${
                          formData.category === cat.id
                            ? "border-primary bg-accent"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <cat.icon
                          className={`w-4 h-4 ${
                            formData.category === cat.id
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                        <span className="text-sm font-medium">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="anonymous">Post Anonymously</Label>
                      <p className="text-xs text-muted-foreground">
                        Your name won't be shown to others
                      </p>
                    </div>
                    <Switch
                      id="anonymous"
                      checked={formData.isAnonymous}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, isAnonymous: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="urgent">Mark as Urgent</Label>
                        <AlertCircle className="w-4 h-4 text-destructive" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Get prioritized responses
                      </p>
                    </div>
                    <Switch
                      id="urgent"
                      checked={formData.isUrgent}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, isUrgent: checked }))
                      }
                    />
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={
                    isLoading ||
                    !formData.title ||
                    !formData.description ||
                    !formData.category
                  }
                >
                  {isLoading ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Post Question
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Assistant */}
        <AIAssistant
          title={formData.title}
          description={formData.description}
          category={formData.category}
        />
      </main>
    </div>
  );
}
