import { Phone, ExternalLink, HeartHandshake, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Resource } from "@shared/schema";

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const isEmergency = resource.type === "Emergency";
  
  return (
    <div className={cn(
      "group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1",
      isEmergency 
        ? "bg-red-50/50 border-red-100 shadow-lg shadow-red-100/50 hover:shadow-xl hover:shadow-red-200/50 hover:border-red-200" 
        : "bg-white border-border/50 shadow-sm hover:shadow-lg hover:border-border hover:shadow-primary/5"
    )}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            "p-3 rounded-xl",
            isEmergency ? "bg-red-100 text-red-600" : "bg-primary/10 text-primary"
          )}>
            {isEmergency ? <Zap className="w-6 h-6" /> : <HeartHandshake className="w-6 h-6" />}
          </div>
          <span className={cn(
            "text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full",
            isEmergency ? "bg-red-100 text-red-700" : "bg-secondary text-secondary-foreground"
          )}>
            {resource.type}
          </span>
        </div>

        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {resource.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
          {resource.description}
        </p>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Phone className="w-4 h-4 text-primary/70" />
            <span>{resource.contact}</span>
          </div>
          
          {resource.url && (
            <a 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-primary hover:underline hover:underline-offset-4"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Website
            </a>
          )}
        </div>
      </div>
      
      {/* Decorative gradient background */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500",
        isEmergency 
          ? "bg-gradient-to-br from-red-500/5 via-transparent to-transparent" 
          : "bg-gradient-to-br from-primary/5 via-transparent to-transparent"
      )} />
    </div>
  );
}
