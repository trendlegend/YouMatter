import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 mt-auto border-t border-border/40 bg-white/50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          Built with <Heart className="w-4 h-4 text-rose-400 fill-rose-400" /> for YouMatter Support
        </p>
        <p className="mt-2 text-xs text-muted-foreground/60">
          Powered by Google Gemini AI
        </p>
      </div>
    </footer>
  );
}
