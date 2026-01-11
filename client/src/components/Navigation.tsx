import { Link, useLocation } from "wouter";
import { MessageCircle, BookHeart, Info, Home, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/chat", label: "MindPal Chat", icon: MessageCircle },
    { href: "/resources", label: "Resources", icon: BookHeart },
    { href: "/about", label: "About", icon: Info },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-primary/60 flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
                M
              </div>
              <span className="font-display font-bold text-xl text-primary tracking-tight">
                MindPal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <div
                  className={cn(
                    "px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer",
                    isActive(link.href)
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                  )}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:bg-secondary/50 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 bg-white/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl flex items-center gap-3 text-base font-medium transition-colors cursor-pointer",
                      isActive(link.href)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary/50"
                    )}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
