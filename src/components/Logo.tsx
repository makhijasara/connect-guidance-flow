import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Logo({ size = "default" }: { size?: "default" | "large" }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <motion.div
        className={`flex items-center justify-center rounded-xl gradient-primary shadow-glow ${
          size === "large" ? "w-14 h-14" : "w-10 h-10"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={size === "large" ? "w-8 h-8" : "w-6 h-6"}
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            fill="currentColor"
            className="text-primary-foreground"
          />
          <path
            d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
            fill="currentColor"
            className="text-primary-foreground opacity-70"
          />
          <circle cx="12" cy="12" r="2" fill="currentColor" className="text-primary-foreground" />
        </svg>
      </motion.div>
      <div className="flex flex-col">
        <span className={`font-bold tracking-tight ${size === "large" ? "text-2xl" : "text-lg"}`}>
          COMMON THREAD
        </span>
        {size === "large" && (
          <span className="text-xs text-muted-foreground italic">Knowledge cancels fear</span>
        )}
      </div>
    </Link>
  );
}
