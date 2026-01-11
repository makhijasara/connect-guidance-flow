import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, X, Send, Loader2 } from "lucide-react";
import { getDoubtAnswer } from "@/lib/ai-service";

interface AIAssistantProps {
  title?: string;
  description?: string;
  category?: string;
  onSuggestionApply?: (answer: string) => void;
}

export function AIAssistant({ title, description, category, onSuggestionApply }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetAIHelp = async () => {
    if (!title || !description || !category) {
      setError("Please fill in the question details first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAiResponse(null);

    try {
      const response = await getDoubtAnswer(title, description, category);
      setAiResponse(response.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get AI response");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating AI Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 lg:bottom-8 lg:right-8 z-50 w-14 h-14 rounded-full gradient-primary shadow-glow flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Sparkles className="w-6 h-6 text-primary-foreground" />
      </motion.button>

      {/* AI Assistant Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg"
            >
              <Card variant="elevated" className="shadow-card-hover">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-primary-foreground" />
                    </div>
                    AI Assistant
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Get instant AI-powered suggestions for your question. Our AI assistant 
                    can help formulate answers and provide guidance.
                  </p>

                  {!aiResponse && !isLoading && (
                    <div className="p-4 rounded-xl bg-accent/50 border border-border">
                      <p className="text-sm font-medium mb-2">Current Question:</p>
                      <p className="text-sm text-muted-foreground">
                        {title || "No title provided"}
                      </p>
                      {description && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {description}
                        </p>
                      )}
                    </div>
                  )}

                  {error && (
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                      {error}
                    </div>
                  )}

                  {isLoading && (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      <span className="ml-3 text-muted-foreground">
                        Generating AI response...
                      </span>
                    </div>
                  )}

                  {aiResponse && (
                    <div className="space-y-3">
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 max-h-64 overflow-y-auto">
                        <p className="text-sm font-medium text-primary mb-2">AI Suggestion:</p>
                        <div className="text-sm text-foreground whitespace-pre-wrap">
                          {aiResponse}
                        </div>
                      </div>
                      {onSuggestionApply && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            onSuggestionApply(aiResponse);
                            setIsOpen(false);
                          }}
                        >
                          Use this as answer
                        </Button>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="hero"
                      className="flex-1"
                      onClick={handleGetAIHelp}
                      disabled={isLoading || !title || !description}
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Get AI Help
                        </>
                      )}
                    </Button>
                  </div>

                  <p className="text-xs text-center text-muted-foreground">
                    Powered by Google Gemini AI
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
