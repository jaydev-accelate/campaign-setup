import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import {
  Sparkles,
  Bot,
  User,
  Send,
  Wand2,
  Play,
  RefreshCw,
  Heart,
  Target,
  Users,
  Clock,
  BookOpen,
  Lightbulb,
  Zap,
  Brain,
  CheckCircle,
  ArrowRight,
  Plus,
  MessageSquare,
  Eye,
  Settings,
  Download,
  Lock,
  Unlock,
  AlertCircle,
  Layers,
  TreePine,
  Palette,
  Compass,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner@2.0.3";

// AURELIA System Types
interface AureliaElement {
  id: string;
  name: string;
  description: string;
  hierarchy: "developmental" | "wellness" | "aesthetic";
  layer: 1 | 2 | 3; // Layer 3 = foundational, Layer 2 = intermediate, Layer 1 = mastery
  category: string;
  selected: boolean;
  unlocked: boolean;
  dependencies?: string[];
  aiGenerated?: boolean;
  temporal?: string; // e.g., "hours/days", "days/weeks", "weeks/months"
}

interface Message {
  id: string;
  type: "user" | "ai" | "system" | "guidance";
  content: string;
  timestamp: Date;
  suggestions?: string[];
  aureliaElements?: AureliaElement[];
  currentPhase?: AureliaPhase;
  visualElements?: any[];
  scriptPreview?: string;
  quickActions?: string[];
  phaseTransition?: {
    from: AureliaPhase;
    to: AureliaPhase;
    reason: string;
  };
}

interface AureliaPhase {
  hierarchy: "developmental" | "wellness" | "aesthetic";
  layer: 1 | 2 | 3;
  name: string;
  description: string;
  requirements: string[];
  unlocked: boolean;
}

interface ScriptPreview {
  title: string;
  duration: string;
  wordCount: number;
  completionScore: number;
  hierarchyBalance: {
    developmental: number;
    wellness: number;
    aesthetic: number;
  };
  sections: {
    name: string;
    content: string;
    duration: string;
    elements: string[];
  }[];
}

const AIScriptBuilder: React.FC = () => {
  // AURELIA System Phases (following proper dependency order)
  const aureliaPhases: AureliaPhase[] = [
    // Layer 3 - Foundational (must be completed first)
    {
      hierarchy: "developmental",
      layer: 3,
      name: "Moods",
      description: "Fundamental emotional and cognitive states",
      requirements: [],
      unlocked: true,
    },
    {
      hierarchy: "wellness",
      layer: 3,
      name: "Frameworks",
      description:
        "Conceptual narratives and thematic contexts",
      requirements: [],
      unlocked: true,
    },
    {
      hierarchy: "aesthetic",
      layer: 3,
      name: "Settings",
      description: "Foundational sensory environments",
      requirements: [],
      unlocked: true,
    },

    // Layer 2 - Intermediate (requires foundational elements)
    {
      hierarchy: "developmental",
      layer: 2,
      name: "Skills",
      description: "Consistent behavioral patterns",
      requirements: ["Moods"],
      unlocked: false,
    },
    {
      hierarchy: "wellness",
      layer: 2,
      name: "Techniques",
      description: "Specific, actionable exercises",
      requirements: ["Frameworks"],
      unlocked: false,
    },
    {
      hierarchy: "aesthetic",
      layer: 2,
      name: "Styles & Tones",
      description: "Linguistic and emotional frameworks",
      requirements: ["Settings"],
      unlocked: false,
    },

    // Layer 1 - Mastery (requires intermediate elements)
    {
      hierarchy: "developmental",
      layer: 1,
      name: "Concepts",
      description:
        "High-level cognitive and behavioral mastery",
      requirements: ["Skills"],
      unlocked: false,
    },
    {
      hierarchy: "wellness",
      layer: 1,
      name: "Methods",
      description: "Macro-level wellness practices",
      requirements: ["Techniques"],
      unlocked: false,
    },
    {
      hierarchy: "aesthetic",
      layer: 1,
      name: "Archetypes",
      description: "Integrated narrative personas",
      requirements: ["Styles & Tones"],
      unlocked: false,
    },
  ];

  // Sample AURELIA Elements
  const aureliaElements: AureliaElement[] = [
    // Developmental Hierarchy - Layer 3 (Moods)
    {
      id: "m1",
      name: "Calm Awareness",
      description: "Sustained state of peaceful attention",
      hierarchy: "developmental",
      layer: 3,
      category: "Moods",
      selected: false,
      unlocked: true,
      temporal: "hours/days",
    },
    {
      id: "m2",
      name: "Grounded Presence",
      description: "Deep connection to present moment",
      hierarchy: "developmental",
      layer: 3,
      category: "Moods",
      selected: false,
      unlocked: true,
      temporal: "hours/days",
    },
    {
      id: "m3",
      name: "Open Receptivity",
      description: "Willingness to receive new experiences",
      hierarchy: "developmental",
      layer: 3,
      category: "Moods",
      selected: false,
      unlocked: true,
      temporal: "hours/days",
    },

    // Developmental Hierarchy - Layer 2 (Skills)
    {
      id: "h1",
      name: "Mindful Breathing",
      description: "Consistent breath awareness practice",
      hierarchy: "developmental",
      layer: 2,
      category: "Skills",
      selected: false,
      unlocked: false,
      dependencies: ["m1"],
      temporal: "days/weeks",
    },
    {
      id: "h2",
      name: "Body Scanning",
      description:
        "Systematic awareness of physical sensations",
      hierarchy: "developmental",
      layer: 2,
      category: "Skills",
      selected: false,
      unlocked: false,
      dependencies: ["m2"],
      temporal: "days/weeks",
    },

    // Developmental Hierarchy - Layer 1 (Concepts)
    {
      id: "sk1",
      name: "Stress Mastery",
      description: "Complete integration of stress management",
      hierarchy: "developmental",
      layer: 1,
      category: "Concepts",
      selected: false,
      unlocked: false,
      dependencies: ["h1", "h2"],
      temporal: "weeks/months",
    },

    // Wellness Hierarchy - Layer 3 (Frameworks)
    {
      id: "f1",
      name: "Chakra System",
      description: "Energy center framework for healing",
      hierarchy: "wellness",
      layer: 3,
      category: "Frameworks",
      selected: false,
      unlocked: true,
    },
    {
      id: "f2",
      name: "Four Elements",
      description: "Earth, water, fire, air balancing",
      hierarchy: "wellness",
      layer: 3,
      category: "Frameworks",
      selected: false,
      unlocked: true,
    },

    // Wellness Hierarchy - Layer 2 (Techniques)
    {
      id: "t1",
      name: "Progressive Relaxation",
      description: "Systematic muscle tension release",
      hierarchy: "wellness",
      layer: 2,
      category: "Techniques",
      selected: false,
      unlocked: false,
      dependencies: ["f1"],
    },
    {
      id: "t2",
      name: "Visualization Journey",
      description: "Guided imagery for transformation",
      hierarchy: "wellness",
      layer: 2,
      category: "Techniques",
      selected: false,
      unlocked: false,
      dependencies: ["f2"],
    },

    // Wellness Hierarchy - Layer 1 (Methods)
    {
      id: "me1",
      name: "Holistic Healing",
      description: "Integrated wellness approach",
      hierarchy: "wellness",
      layer: 1,
      category: "Methods",
      selected: false,
      unlocked: false,
      dependencies: ["t1", "t2"],
    },

    // Aesthetic Hierarchy - Layer 3 (Settings)
    {
      id: "se1",
      name: "Forest Sanctuary",
      description: "Peaceful woodland environment",
      hierarchy: "aesthetic",
      layer: 3,
      category: "Settings",
      selected: false,
      unlocked: true,
    },
    {
      id: "se2",
      name: "Ocean Depths",
      description: "Calming underwater setting",
      hierarchy: "aesthetic",
      layer: 3,
      category: "Settings",
      selected: false,
      unlocked: true,
    },

    // Aesthetic Hierarchy - Layer 2 (Styles & Tones)
    {
      id: "st1",
      name: "Nurturing Guide",
      description: "Warm, supportive vocal style",
      hierarchy: "aesthetic",
      layer: 2,
      category: "Styles & Tones",
      selected: false,
      unlocked: false,
      dependencies: ["se1"],
    },
    {
      id: "st2",
      name: "Wise Teacher",
      description: "Knowledgeable, patient tone",
      hierarchy: "aesthetic",
      layer: 2,
      category: "Styles & Tones",
      selected: false,
      unlocked: false,
      dependencies: ["se2"],
    },

    // Aesthetic Hierarchy - Layer 1 (Archetypes)
    {
      id: "a1",
      name: "The Healer",
      description: "Compassionate healing presence",
      hierarchy: "aesthetic",
      layer: 1,
      category: "Archetypes",
      selected: false,
      unlocked: false,
      dependencies: ["st1", "st2"],
    },
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "guidance",
      content:
        "Welcome to the AURELIA Wellness Script Creator! I'm here to guide you through building a scientifically-structured wellness experience. We'll work through three interconnected hierarchies: Developmental (emotional foundations), Wellness (therapeutic practices), and Aesthetic (narrative elements). Each builds upon the previous layer - let's start with the foundations. What type of emotional state would you like to cultivate?",
      timestamp: new Date(),
      currentPhase: aureliaPhases.find(
        (p) => p.name === "Moods",
      ),
      quickActions: [
        "I want to create calm awareness",
        "Help me feel more grounded",
        "I need emotional stability",
        "Show me all foundational options",
        "Explain the AURELIA system",
      ],
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [elements, setElements] =
    useState<AureliaElement[]>(aureliaElements);
  const [phases, setPhases] =
    useState<AureliaPhase[]>(aureliaPhases);
  const [currentPhase, setCurrentPhase] =
    useState<AureliaPhase>(aureliaPhases[0]);
  const [scriptPreview, setScriptPreview] =
    useState<ScriptPreview | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop =
        scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Check dependencies and unlock phases/elements
  const checkDependencies = () => {
    const selectedElements = elements.filter((e) => e.selected);

    // Update element unlocks based on dependencies
    const updatedElements = elements.map((element) => {
      if (element.dependencies) {
        const dependenciesMet = element.dependencies.every(
          (depId) =>
            selectedElements.some(
              (selected) => selected.id === depId,
            ),
        );
        return { ...element, unlocked: dependenciesMet };
      }
      return element;
    });

    // Update phase unlocks
    const updatedPhases = phases.map((phase) => {
      if (phase.requirements.length === 0) return phase; // Always unlocked

      const requirementsMet = phase.requirements.every(
        (reqName) => {
          const reqPhase = phases.find(
            (p) => p.name === reqName,
          );
          if (!reqPhase) return false;

          // Check if we have selected elements from this required phase
          const hasElementsFromPhase = selectedElements.some(
            (element) =>
              element.category === reqName && element.selected,
          );

          return hasElementsFromPhase;
        },
      );

      return { ...phase, unlocked: requirementsMet };
    });

    setElements(updatedElements);
    setPhases(updatedPhases);
  };

  useEffect(() => {
    checkDependencies();
  }, [elements]);

  const getAvailablePhases = () => {
    return phases.filter((phase) => phase.unlocked);
  };

  const suggestNextPhase = () => {
    const selectedElements = elements.filter((e) => e.selected);
    const currentHierarchyElements = selectedElements.filter(
      (e) => e.hierarchy === currentPhase.hierarchy,
    );

    if (
      currentHierarchyElements.length >= 1 &&
      currentPhase.layer > 1
    ) {
      // Move to next layer up in same hierarchy
      const nextLayer = currentPhase.layer - 1;
      const nextPhase = phases.find(
        (p) =>
          p.hierarchy === currentPhase.hierarchy &&
          p.layer === nextLayer,
      );
      if (nextPhase?.unlocked) {
        return nextPhase;
      }
    }

    // Suggest moving to a different foundational hierarchy
    const foundationalPhases = phases.filter(
      (p) =>
        p.layer === 3 &&
        p.unlocked &&
        p.hierarchy !== currentPhase.hierarchy,
    );
    if (foundationalPhases.length > 0) {
      return foundationalPhases[0];
    }

    return null;
  };

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = "";
      let suggestions: string[] = [];
      let aureliaElements: AureliaElement[] = [];
      let quickActions: string[] = [];
      let phaseTransition = null;

      const selectedElements = elements.filter(
        (e) => e.selected,
      );
      const availableElements = elements.filter(
        (e) => e.unlocked && e.category === currentPhase.name,
      );

      if (
        userMessage.toLowerCase().includes("explain") &&
        userMessage.toLowerCase().includes("aurelia")
      ) {
        aiResponse =
          "The AURELIA system ensures your wellness script has proper foundations. We build in layers: first Moods/Frameworks/Settings (foundational states), then Skills/Techniques/Styles (behavioral patterns), finally Concepts/Methods/Archetypes (mastery outcomes). Each layer depends on the previous - this creates lasting transformation rather than surface-level change.";
        quickActions = [
          "Start with foundational moods",
          "Show me the hierarchy",
          "Let's begin building",
          "I understand, continue",
        ];
      } else if (
        userMessage.toLowerCase().includes("calm") ||
        userMessage.toLowerCase().includes("awareness")
      ) {
        aiResponse = `Perfect! Calm Awareness is a foundational mood that creates the perfect base for deeper work. This sustained state of peaceful attention typically develops over hours to days of practice. Once established, it will unlock more advanced skills. Would you like to select this and explore what it enables?`;

        aureliaElements = availableElements.filter(
          (e) => e.name.includes("Calm") || e.id === "m1",
        );
        quickActions = [
          "Select Calm Awareness",
          "What does this unlock?",
          "Show me other mood options",
          "Add a complementary mood",
        ];
      } else if (
        userMessage.toLowerCase().includes("grounded") ||
        userMessage.toLowerCase().includes("ground")
      ) {
        aiResponse = `Grounded Presence is essential for stability! This deep connection to the present moment forms the foundation for body-based awareness practices. It's particularly powerful for those feeling scattered or anxious. Shall we add this to your foundation?`;

        aureliaElements = availableElements.filter(
          (e) => e.name.includes("Grounded") || e.id === "m2",
        );
        quickActions = [
          "Select Grounded Presence",
          "Combine with Calm Awareness",
          "What comes after this?",
          "Show body-based practices",
        ];
      } else if (
        userMessage.toLowerCase().includes("next") ||
        userMessage.toLowerCase().includes("advance")
      ) {
        const nextPhase = suggestNextPhase();
        if (nextPhase && nextPhase.name !== currentPhase.name) {
          aiResponse = `Excellent foundation work! You've established ${selectedElements.filter((e) => e.hierarchy === currentPhase.hierarchy).length} ${currentPhase.name.toLowerCase()} elements. Now we can unlock ${nextPhase.name} - ${nextPhase.description}. This is where your foundational states transform into consistent patterns.`;

          phaseTransition = {
            from: currentPhase,
            to: nextPhase,
            reason: `Foundation established with ${selectedElements.length} elements`,
          };

          setCurrentPhase(nextPhase);
          aureliaElements = elements.filter(
            (e) => e.category === nextPhase.name && e.unlocked,
          );
          quickActions = [
            `Explore ${nextPhase.name}`,
            "Show me what I can build",
            "Continue with current phase",
            "See my progress",
          ];
        } else {
          aiResponse = `Let's strengthen your current foundation first. You need at least one solid element in ${currentPhase.name} before we can advance. The AURELIA system ensures each layer is properly established.`;
          quickActions = [
            "Add more foundational elements",
            "Show available options",
            "Why is this important?",
            "Skip to next hierarchy",
          ];
        }
      } else if (
        userMessage.toLowerCase().includes("hierarchy") ||
        userMessage.toLowerCase().includes("different")
      ) {
        const otherFoundational = phases.filter(
          (p) =>
            p.layer === 3 &&
            p.hierarchy !== currentPhase.hierarchy,
        );
        if (otherFoundational.length > 0) {
          const switchTo = otherFoundational[0];
          aiResponse = `Great idea! Let's work on ${switchTo.name} - ${switchTo.description}. This ${switchTo.hierarchy} hierarchy will add another dimension to your wellness script. Having elements from multiple hierarchies creates a more complete experience.`;

          setCurrentPhase(switchTo);
          aureliaElements = elements.filter(
            (e) => e.category === switchTo.name && e.unlocked,
          );
          quickActions = [
            `Explore ${switchTo.name}`,
            "Add complementary elements",
            "Return to previous phase",
            "Show all hierarchies",
          ];
        }
      } else if (selectedElements.length >= 3) {
        aiResponse = `Wonderful progress! You have ${selectedElements.length} elements selected across the AURELIA system. This is creating a well-rounded foundation. Would you like me to generate a preview of your wellness script, or continue building?`;

        quickActions = [
          "Generate script preview",
          "Add more elements",
          "Review my selections",
          "Advance to next layer",
        ];
      } else {
        aiResponse = `I can help you explore ${currentPhase.name} - these are ${currentPhase.description.toLowerCase()}. In the AURELIA system, ${currentPhase.name} ${currentPhase.temporal ? `typically develop over ${currentPhase.temporal}` : "form the foundation for higher-order elements"}. What resonates with you?`;

        aureliaElements = availableElements.slice(0, 3);
        quickActions = [
          "Show all available options",
          "Help me choose",
          "Explain the benefits",
          "Move to next phase",
        ];
      }

      const newMessage: Message = {
        id: Date.now().toString(),
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
        suggestions,
        aureliaElements,
        currentPhase,
        quickActions,
        phaseTransition,
      };

      setMessages((prev) => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    simulateAIResponse(inputValue);
    setInputValue("");
  };

  const handleQuickAction = (action: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: action,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    simulateAIResponse(action);
  };

  const handleElementToggle = (elementId: string) => {
    const element = elements.find((e) => e.id === elementId);
    if (!element || !element.unlocked) {
      toast.error(
        "This element needs prerequisites to be unlocked first!",
      );
      return;
    }

    setElements((prev) =>
      prev.map((e) =>
        e.id === elementId
          ? { ...e, selected: !e.selected }
          : e,
      ),
    );

    const updatedElement = {
      ...element,
      selected: !element.selected,
    };

    const systemMessage: Message = {
      id: Date.now().toString(),
      type: "system",
      content: updatedElement.selected
        ? `Added "${updatedElement.name}" to your ${updatedElement.category}. This ${updatedElement.hierarchy} element will ${updatedElement.dependencies ? `build upon your selected foundations and` : ""} contribute to your script's ${updatedElement.temporal || "overall"} development.`
        : `Removed "${updatedElement.name}" from your selections.`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, systemMessage]);
  };

  const generateScript = () => {
    const selectedElements = elements.filter((e) => e.selected);
    if (selectedElements.length === 0) {
      toast.error("Please select some AURELIA elements first!");
      return;
    }

    // Calculate hierarchy balance
    const developmental = selectedElements.filter(
      (e) => e.hierarchy === "developmental",
    ).length;
    const wellness = selectedElements.filter(
      (e) => e.hierarchy === "wellness",
    ).length;
    const aesthetic = selectedElements.filter(
      (e) => e.hierarchy === "aesthetic",
    ).length;
    const total = selectedElements.length;

    const completionScore = Math.min((total / 6) * 100, 100); // Ideal is 6+ elements

    setScriptPreview({
      title: "AURELIA Wellness Journey",
      duration: "10-15 minutes",
      wordCount: 650,
      completionScore,
      hierarchyBalance: {
        developmental: (developmental / total) * 100,
        wellness: (wellness / total) * 100,
        aesthetic: (aesthetic / total) * 100,
      },
      sections: [
        {
          name: "Foundation Setting",
          content:
            "We begin by establishing your foundational state, drawing upon the elements you've selected...",
          duration: "3 min",
          elements: selectedElements
            .filter((e) => e.layer === 3)
            .map((e) => e.name),
        },
        {
          name: "Skill Integration",
          content:
            "Now we activate your behavioral patterns, building upon the foundation we've created...",
          duration: "5 min",
          elements: selectedElements
            .filter((e) => e.layer === 2)
            .map((e) => e.name),
        },
        {
          name: "Mastery Expression",
          content:
            "Finally, we integrate these elements into lasting mastery and transformation...",
          duration: "4 min",
          elements: selectedElements
            .filter((e) => e.layer === 1)
            .map((e) => e.name),
        },
        {
          name: "Integration & Closing",
          content:
            "We complete this journey by anchoring these new patterns into your daily life...",
          duration: "3 min",
          elements: ["All selected elements"],
        },
      ],
    });

    setShowPreview(true);
    toast.success(
      "Your AURELIA wellness script has been generated with proper hierarchical structure!",
    );
  };

  const getPhaseIcon = (hierarchy: string) => {
    switch (hierarchy) {
      case "developmental":
        return TreePine;
      case "wellness":
        return Heart;
      case "aesthetic":
        return Palette;
      default:
        return Compass;
    }
  };

  const getLayerColor = (layer: number) => {
    switch (layer) {
      case 3:
        return "bg-green-100 border-green-300 text-green-800";
      case 2:
        return "bg-yellow-100 border-yellow-300 text-yellow-800";
      case 1:
        return "bg-purple-100 border-purple-300 text-purple-800";
      default:
        return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };

  const selectedCount = elements.filter(
    (e) => e.selected,
  ).length;
  const hierarchyProgress = {
    developmental: elements.filter(
      (e) => e.hierarchy === "developmental" && e.selected,
    ).length,
    wellness: elements.filter(
      (e) => e.hierarchy === "wellness" && e.selected,
    ).length,
    aesthetic: elements.filter(
      (e) => e.hierarchy === "aesthetic" && e.selected,
    ).length,
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-purple-100 bg-white/70 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-medium">
                  AURELIA Wellness Script Creator
                </h1>
                <p className="text-sm text-gray-600">
                  Structured hierarchical wellness experience
                  builder
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {React.createElement(
                  getPhaseIcon(currentPhase.hierarchy),
                  { className: "w-4 h-4" },
                )}
                <Badge variant="secondary" className="text-xs">
                  {currentPhase.name} (Layer{" "}
                  {currentPhase.layer})
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? "Hide" : "Show"} Preview
              </Button>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <TreePine className="w-3 h-3 text-green-600" />
                <span className="text-xs font-medium">
                  Developmental
                </span>
                <span className="text-xs text-gray-500">
                  ({hierarchyProgress.developmental})
                </span>
              </div>
              <Progress
                value={
                  (hierarchyProgress.developmental / 3) * 100
                }
                className="h-1"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Heart className="w-3 h-3 text-red-600" />
                <span className="text-xs font-medium">
                  Wellness
                </span>
                <span className="text-xs text-gray-500">
                  ({hierarchyProgress.wellness})
                </span>
              </div>
              <Progress
                value={(hierarchyProgress.wellness / 3) * 100}
                className="h-1"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Palette className="w-3 h-3 text-purple-600" />
                <span className="text-xs font-medium">
                  Aesthetic
                </span>
                <span className="text-xs text-gray-500">
                  ({hierarchyProgress.aesthetic})
                </span>
              </div>
              <Progress
                value={(hierarchyProgress.aesthetic / 3) * 100}
                className="h-1"
              />
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full p-6">
            <div
              ref={scrollRef}
              className="space-y-6 max-w-4xl mx-auto"
            >
              {messages.map((message) => (
                <div key={message.id} className="space-y-4">
                  {/* Message Bubble */}
                  <div
                    className={`flex gap-3 ${message.type === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === "user"
                          ? "bg-blue-600"
                          : message.type === "system"
                            ? "bg-green-500"
                            : message.type === "guidance"
                              ? "bg-gradient-to-r from-purple-600 to-blue-600"
                              : "bg-gradient-to-r from-purple-600 to-blue-600"
                      }`}
                    >
                      {message.type === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : message.type === "system" ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : message.type === "guidance" ? (
                        <Compass className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>

                    <div
                      className={`flex-1 ${message.type === "user" ? "text-right" : ""}`}
                    >
                      <div
                        className={`inline-block p-4 rounded-2xl max-w-[600px] ${
                          message.type === "user"
                            ? "bg-blue-600 text-white"
                            : message.type === "system"
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : message.type === "guidance"
                                ? "bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200"
                                : "bg-white border border-purple-100 shadow-sm"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">
                          {message.content}
                        </p>
                      </div>

                      <div className="text-xs text-gray-500 mt-2">
                        {message.timestamp.toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Phase Transition */}
                  {message.phaseTransition && (
                    <div className="mx-8">
                      <Card className="border-purple-200 bg-purple-50">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <ArrowRight className="w-5 h-5 text-purple-600" />
                            <div>
                              <h4 className="font-medium text-sm">
                                Phase Transition
                              </h4>
                              <p className="text-xs text-gray-600">
                                {
                                  message.phaseTransition.from
                                    .name
                                }{" "}
                                →{" "}
                                {
                                  message.phaseTransition.to
                                    .name
                                }
                              </p>
                              <p className="text-xs text-purple-700 mt-1">
                                {message.phaseTransition.reason}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* AURELIA Elements */}
                  {message.aureliaElements &&
                    message.aureliaElements.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
                          <Layers className="w-4 h-4" />
                          Available {currentPhase.name} Elements
                          {currentPhase.temporal && (
                            <Badge
                              variant="outline"
                              className="text-xs"
                            >
                              {currentPhase.temporal}
                            </Badge>
                          )}
                        </h4>
                        <div className="grid gap-3">
                          {message.aureliaElements.map(
                            (element) => (
                              <Card
                                key={element.id}
                                className={`cursor-pointer transition-all border ${
                                  elements.find(
                                    (e) => e.id === element.id,
                                  )?.selected
                                    ? "border-purple-300 bg-purple-50"
                                    : element.unlocked
                                      ? "border-gray-200 hover:border-purple-200"
                                      : "border-gray-100 bg-gray-50 opacity-60"
                                }`}
                                onClick={() =>
                                  handleElementToggle(
                                    element.id,
                                  )
                                }
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-start gap-3">
                                    <div
                                      className={`w-5 h-5 rounded border-2 mt-0.5 flex items-center justify-center ${
                                        elements.find(
                                          (e) =>
                                            e.id === element.id,
                                        )?.selected
                                          ? "border-purple-500 bg-purple-500"
                                          : element.unlocked
                                            ? "border-gray-300"
                                            : "border-gray-200"
                                      }`}
                                    >
                                      {!element.unlocked ? (
                                        <Lock className="w-3 h-3 text-gray-400" />
                                      ) : elements.find(
                                          (e) =>
                                            e.id === element.id,
                                        )?.selected ? (
                                        <CheckCircle className="w-3 h-3 text-white" />
                                      ) : (
                                        <Unlock className="w-3 h-3 text-gray-400" />
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <h5 className="font-medium text-sm">
                                          {element.name}
                                        </h5>
                                        <Badge
                                          className={`text-xs ${getLayerColor(element.layer)}`}
                                        >
                                          Layer {element.layer}
                                        </Badge>
                                        {element.aiGenerated && (
                                          <Badge
                                            variant="secondary"
                                            className="text-xs"
                                          >
                                            <Sparkles className="w-3 h-3 mr-1" />
                                            AI
                                          </Badge>
                                        )}
                                      </div>
                                      <p className="text-xs text-gray-600 mb-2">
                                        {element.description}
                                      </p>
                                      <div className="flex items-center gap-2">
                                        <Badge
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {element.category}
                                        </Badge>
                                        {element.dependencies &&
                                          element.dependencies
                                            .length > 0 && (
                                            <span className="text-xs text-gray-500">
                                              Requires:{" "}
                                              {element.dependencies.join(
                                                ", ",
                                              )}
                                            </span>
                                          )}
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                  {/* Quick Actions */}
                  {message.quickActions &&
                    message.quickActions.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {message.quickActions.map(
                          (action, idx) => (
                            <Button
                              key={idx}
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleQuickAction(action)
                              }
                              className="text-xs bg-white hover:bg-purple-50 border-purple-200"
                            >
                              {action}
                            </Button>
                          ),
                        )}
                      </div>
                    )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-purple-100 rounded-2xl p-4 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-purple-100 bg-white/70 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) =>
                    setInputValue(e.target.value)
                  }
                  placeholder="Ask about AURELIA elements, request guidance, or describe what you need..."
                  className="pr-16 bg-white border-purple-200 focus:border-purple-400"
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleSendMessage()
                  }
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() =>
                      handleQuickAction(
                        "Show me next phase options",
                      )
                    }
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Quick Suggestions */}
            <div className="flex gap-2 mt-3 flex-wrap">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  handleQuickAction("Show me available phases")
                }
                className="text-xs text-purple-600 hover:bg-purple-50"
              >
                <Layers className="w-3 h-3 mr-1" />
                Available Phases
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  handleQuickAction("What can I unlock next?")
                }
                className="text-xs text-blue-600 hover:bg-blue-50"
              >
                <Unlock className="w-3 h-3 mr-1" />
                What's Next?
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={generateScript}
                className="text-xs text-green-600 hover:bg-green-50"
                disabled={selectedCount === 0}
              >
                <Zap className="w-3 h-3 mr-1" />
                Generate Script ({selectedCount})
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Script Preview Sidebar */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="w-96 bg-white border-l border-purple-100 flex flex-col shadow-xl"
          >
            {/* Preview Header */}
            <div className="p-4 border-b border-purple-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">
                  AURELIA Script Preview
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreview(false)}
                >
                  ×
                </Button>
              </div>

              {scriptPreview && (
                <div className="space-y-3">
                  <h4 className="font-medium">
                    {scriptPreview.title}
                  </h4>
                  <div className="flex gap-4 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {scriptPreview.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {scriptPreview.wordCount} words
                    </span>
                  </div>

                  {/* Completion Score */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium">
                        Completion Score
                      </span>
                      <span className="text-xs">
                        {Math.round(
                          scriptPreview.completionScore,
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={scriptPreview.completionScore}
                      className="h-2"
                    />
                  </div>

                  {/* Hierarchy Balance */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-medium">
                      Hierarchy Balance
                    </h5>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">
                          Developmental
                        </span>
                        <span className="text-xs">
                          {Math.round(
                            scriptPreview.hierarchyBalance
                              .developmental,
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          scriptPreview.hierarchyBalance
                            .developmental
                        }
                        className="h-1"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">
                          Wellness
                        </span>
                        <span className="text-xs">
                          {Math.round(
                            scriptPreview.hierarchyBalance
                              .wellness,
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          scriptPreview.hierarchyBalance
                            .wellness
                        }
                        className="h-1"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">
                          Aesthetic
                        </span>
                        <span className="text-xs">
                          {Math.round(
                            scriptPreview.hierarchyBalance
                              .aesthetic,
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          scriptPreview.hierarchyBalance
                            .aesthetic
                        }
                        className="h-1"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Selected Elements by Hierarchy */}
            <div className="p-4 border-b border-purple-100">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Selected Elements ({selectedCount})
              </h4>

              {["developmental", "wellness", "aesthetic"].map(
                (hierarchy) => {
                  const hierarchyElements = elements.filter(
                    (e) =>
                      e.hierarchy === hierarchy && e.selected,
                  );
                  if (hierarchyElements.length === 0)
                    return null;

                  return (
                    <div key={hierarchy} className="mb-3">
                      <h5 className="text-xs font-medium mb-2 flex items-center gap-1">
                        {React.createElement(
                          getPhaseIcon(hierarchy),
                          { className: "w-3 h-3" },
                        )}
                        {hierarchy.charAt(0).toUpperCase() +
                          hierarchy.slice(1)}
                      </h5>
                      <div className="space-y-1">
                        {hierarchyElements.map((element) => (
                          <div
                            key={element.id}
                            className="flex items-center gap-2 p-2 bg-gray-50 rounded text-xs"
                          >
                            <Badge
                              className={`${getLayerColor(element.layer)} text-xs`}
                            >
                              L{element.layer}
                            </Badge>
                            <span>{element.name}</span>
                            {element.aiGenerated && (
                              <Sparkles className="w-3 h-3 text-purple-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                },
              )}
            </div>

            {/* Script Sections */}
            {scriptPreview && (
              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    {scriptPreview.sections.map(
                      (section, idx) => (
                        <div
                          key={idx}
                          className="border border-purple-100 rounded-lg p-3"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-sm">
                              {section.name}
                            </h5>
                            <span className="text-xs text-gray-500">
                              {section.duration}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed mb-2">
                            {section.content}
                          </p>
                          {section.elements.length > 0 && (
                            <div className="text-xs text-purple-600">
                              Elements:{" "}
                              {section.elements.join(", ")}
                            </div>
                          )}
                        </div>
                      ),
                    )}
                  </div>
                </ScrollArea>
              </div>
            )}

            {/* Preview Actions */}
            <div className="p-4 border-t border-purple-100 space-y-2">
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                disabled={selectedCount < 3}
              >
                <Download className="w-4 h-4 mr-2" />
                Generate Full Script
              </Button>
              {selectedCount < 3 && (
                <p className="text-xs text-center text-gray-500">
                  Add {3 - selectedCount} more elements for
                  optimal script generation
                </p>
              )}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Play className="w-3 h-3 mr-1" />
                  Preview Audio
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Settings className="w-3 h-3 mr-1" />
                  Customize
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIScriptBuilder;