import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { ArrowRight, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-32 px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center lg:text-left z-10"
            >
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-[1.1]">
                A safe space for <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
                  your mind.
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Meet YouMatter, your compassionate AI companion. 
                Talk freely, find resources, and prioritize your mental well-being in a judgment-free zone.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link href="/chat">
                  <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                    Start Chatting <MessageCircle className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/resources">
                  <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-foreground border border-border/50 font-semibold shadow-sm hover:bg-secondary/50 transition-all duration-200">
                    View Resources
                  </button>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/10 border border-white/50 relative z-10 group">
                {/* Peaceful student studying - Unsplash */}
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" 
                  alt="Students collaborating" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Decorative background blobs */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl -z-10 animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse delay-700" />
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: MessageCircle,
                  title: "24/7 Support",
                  desc: "Always here to listen. Our AI companion provides immediate, supportive responses whenever you need them."
                },
                {
                  icon: ShieldCheck,
                  title: "Private & Safe",
                  desc: "Your conversations are private. We prioritize creating a safe, anonymous environment for you to share."
                },
                {
                  icon: Sparkles,
                  title: "Smart Guidance",
                  desc: "Powered by Google's Gemini, YouMatter offers thoughtful responses and can guide you to professional help."
                }
              ].map((feature, idx) => (
                <div key={idx} className="p-8 rounded-3xl bg-secondary/30 hover:bg-secondary/50 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary mb-6">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
