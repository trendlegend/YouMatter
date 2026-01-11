import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto animate-bounce">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground font-display">404</h1>
          <p className="text-muted-foreground text-lg">
            Oops! This page has wandered off.
          </p>
        </div>

        <Link href="/">
          <button className="px-8 py-3 bg-primary text-white rounded-xl font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}
