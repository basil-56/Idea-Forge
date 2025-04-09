import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Settings, HelpCircle } from "lucide-react";
import { ResearchResultData } from "@/lib/types";

interface SidebarProps {
  savedResults: ResearchResultData[];
  isOpen: boolean;
  onResearchSelect: (research: ResearchResultData) => void;
}

export default function Sidebar({ savedResults, isOpen, onResearchSelect }: SidebarProps) {
  // Recent sample topics - in a real app, these might come from an API
  const recentTopics = [
    "Sustainable Energy Solutions",
    "AI in Healthcare",
    "Remote Work Technologies"
  ];

  if (!isOpen) return null;

  return (
    <aside className="bg-white w-64 border-r border-gray-200 dark:bg-primary-900 dark:border-primary-800 fixed inset-0 z-40 lg:static lg:z-auto lg:h-auto lg:block">
      <div className="h-full flex flex-col overflow-y-auto">
        <div className="px-4 py-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Saved Research
          </h2>
          <div className="mt-3 space-y-2">
            {savedResults.length === 0 ? (
              <div className="text-sm text-gray-500 dark:text-gray-400 py-2">
                No saved research yet
              </div>
            ) : (
              savedResults.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-left text-sm"
                  onClick={() => onResearchSelect(item)}
                >
                  {item.topic}
                </Button>
              ))
            )}
          </div>
        </div>
        
        <div className="px-4 py-6 border-t border-gray-200 dark:border-primary-800">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Recent Topics
          </h2>
          <div className="mt-3 space-y-2">
            {recentTopics.map((topic, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start text-left text-sm"
                onClick={() => {
                  // Would navigate to or load this topic in a real app
                }}
              >
                {topic}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="mt-auto px-4 py-6 border-t border-gray-200 dark:border-primary-800">
          <Button variant="ghost" className="w-full justify-start text-left space-x-3">
            <Settings className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium">Settings</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-left space-x-3 mt-3">
            <HelpCircle className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium">Help & Support</span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
