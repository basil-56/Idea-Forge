import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import ResearchForm from "@/components/research-form";
import ResearchResults from "@/components/research-results";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ResearchResultData } from "@/lib/types";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [researchResults, setResearchResults] = useState<ResearchResultData | null>(null);
  const [savedResults, setSavedResults] = useState<ResearchResultData[]>([]);
  const { toast } = useToast();

  const generateResearch = useMutation({
    mutationFn: async (formData: { topic: string; detailed: boolean }) => {
      const response = await apiRequest("POST", "/api/research/generate", formData);
      return response.json();
    },
    onSuccess: (data: ResearchResultData) => {
      setResearchResults(data);
      setTopic(data.topic);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to generate research: ${error.message}`,
      });
    },
  });

  const saveResearch = () => {
    if (researchResults) {
      // In a real application, we would save this to the database
      setSavedResults([...savedResults, researchResults]);
      
      toast({
        title: "Research Saved",
        description: "Research has been saved successfully.",
      });
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleResearchSelect = (research: ResearchResultData) => {
    setResearchResults(research);
    // Close sidebar on mobile when a research is selected
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleFormSubmit = (data: { topic: string; detailed: boolean }) => {
    generateResearch.mutate(data);
  };

  const LoadingSkeleton = () => (
    <div className="mt-8">
      <Card>
        <CardContent className="pt-6">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-gray-200 rounded dark:bg-primary-700 w-3/4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded dark:bg-primary-700"></div>
              <div className="h-4 bg-gray-200 rounded dark:bg-primary-700 w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded dark:bg-primary-700 w-4/6"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded dark:bg-primary-700 w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded dark:bg-primary-700"></div>
              <div className="h-4 bg-gray-200 rounded dark:bg-primary-700 w-4/6"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-24 bg-gray-200 rounded dark:bg-primary-700"></div>
              <div className="h-24 bg-gray-200 rounded dark:bg-primary-700"></div>
              <div className="h-24 bg-gray-200 rounded dark:bg-primary-700"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-primary-900 text-primary-900 dark:text-gray-100">
      <Header toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          savedResults={savedResults} 
          isOpen={sidebarOpen} 
          onResearchSelect={handleResearchSelect} 
        />
        
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none bg-gray-50 dark:bg-primary-900">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Welcome Section */}
              <div className="pb-5 border-b border-gray-200 dark:border-primary-800 mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Research & Idea Lab</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Generate comprehensive research and innovative product ideas on any topic
                </p>
              </div>

              {/* Research Form */}
              <ResearchForm 
                onSubmit={handleFormSubmit} 
                isLoading={generateResearch.isPending} 
              />

              {/* Loading State */}
              {generateResearch.isPending && <LoadingSkeleton />}

              {/* Research Results */}
              {!generateResearch.isPending && researchResults && (
                <ResearchResults 
                  research={researchResults} 
                  onSave={saveResearch} 
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
