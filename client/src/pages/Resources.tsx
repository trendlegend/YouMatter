import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ResourceCard } from "@/components/ResourceCard";
import { useResources } from "@/hooks/use-resources";
import { Loader2, Search } from "lucide-react";
import { useState } from "react";

export default function Resources() {
  const { data: resources, isLoading } = useResources();
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Emergency", "Counseling", "Self-care"];
  
  const filteredResources = resources?.filter(r => 
    filter === "All" ? true : r.type === filter
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navigation />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Mental Health Resources</h1>
          <p className="text-muted-foreground text-lg">
            Curated list of support services, hotlines, and self-care tools. You are not alone.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`
                px-6 py-2 rounded-full font-medium transition-all duration-200
                ${filter === cat 
                  ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105' 
                  : 'bg-white text-muted-foreground border border-border/50 hover:bg-secondary/50'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary/50" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources?.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}

        {!isLoading && filteredResources?.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No resources found for this category.
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
