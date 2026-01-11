import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registerChatRoutes } from "./replit_integrations/chat";
import { registerImageRoutes } from "./replit_integrations/image";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Register integration routes (Gemini Chat & Image)
  registerChatRoutes(app);
  registerImageRoutes(app);

  // API Routes for Resources
  app.get(api.resources.list.path, async (req, res) => {
    const resources = await storage.getResources();
    res.json(resources);
  });

  // Seed Data
  seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingResources = await storage.getResources();
  if (existingResources.length === 0) {
    console.log("Seeding database with resources...");
    await storage.createResource({
      title: "National Suicide Prevention Lifeline",
      description: "We can all help prevent suicide. The Lifeline provides 24/7, free and confidential support for people in distress.",
      contact: "988",
      type: "Emergency",
      url: "https://988lifeline.org"
    });
    await storage.createResource({
      title: "Crisis Text Line",
      description: "Text HOME to 741741 to connect with a Crisis Counselor.",
      contact: "Text HOME to 741741",
      type: "Emergency",
      url: "https://www.crisistextline.org"
    });
    await storage.createResource({
      title: "Headspace for Students",
      description: "Mindfulness and meditation app to help you stress less.",
      contact: "App",
      type: "Self-care",
      url: "https://www.headspace.com/studentplan"
    });
    await storage.createResource({
      title: "Campus Counseling Center",
      description: "Professional counseling services for students available on campus.",
      contact: "555-0123",
      type: "Counseling",
      url: "#"
    });
    console.log("Seeding complete.");
  }
}
