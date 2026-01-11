import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Bot, Code2, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navigation />
      
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-[2rem] shadow-xl shadow-primary/5 border border-white/50 overflow-hidden">
          {/* Header Image */}
          <div className="h-64 relative overflow-hidden">
             {/* Peaceful nature - Unsplash */}
            <img 
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80" 
              alt="Peaceful nature" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
              <h1 className="text-4xl font-bold text-white font-display">About MindPal</h1>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-12">
            
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
                  <Bot className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">The Mission</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                MindPal was created with a simple yet powerful mission: to make mental health support accessible, stigma-free, and available 24/7. We understand that students face unique pressures, and sometimes, you just need someone (or something) to talk to without judgment.
              </p>
            </section>

            <section className="grid md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-secondary/30 border border-secondary/50">
                <div className="flex items-center gap-3 mb-3">
                  <Code2 className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-lg">Innovation Project</h3>
                </div>
                <p className="text-muted-foreground">
                  MindPal represents student innovation tackling real-world problems using cutting-edge technology.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-lg">Google Gemini</h3>
                </div>
                <p className="text-muted-foreground">
                  Powered by Google's advanced Gemini AI models, enabling natural, empathetic, and context-aware conversations that feel genuinely helpful.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">How it Works</h2>
              <div className="space-y-4">
                {[
                  "We use Google's Gemini Flash model for fast, reasoning-capable responses.",
                  "Your conversations are stored securely and remain private.",
                  "Resources are curated from trusted mental health organizations.",
                  "The interface is designed to be calming and reduce cognitive load."
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
