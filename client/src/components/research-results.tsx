import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Copy, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ResearchResultData } from "@/lib/types";

interface ResearchResultsProps {
  research: ResearchResultData;
  onSave: () => void;
}

export default function ResearchResults({ research, onSave }: ResearchResultsProps) {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Research content has been copied to your clipboard.",
      });
    });
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Result Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Research Report: {research.topic}
            </h2>
            <div className="flex space-x-2">
              <Button 
                size="icon" 
                onClick={onSave}
                className="bg-purple-600 hover:bg-purple-700 rounded-full h-9 w-9"
              >
                <Save className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                onClick={() => copyToClipboard(JSON.stringify(research, null, 2))}
                className="bg-purple-600 hover:bg-purple-700 rounded-full h-9 w-9"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-300">{research.summary}</p>
        </CardContent>
      </Card>

      {/* Market Analysis */}
      <Card className="research-card">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Market Analysis</h3>
          <p className="text-gray-600 dark:text-gray-300">{research.marketAnalysis}</p>
        </CardContent>
      </Card>

      {/* Key Findings */}
      <Card className="research-card">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Key Findings</h3>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
            {research.keyFindings.map((finding, index) => (
              <li key={index}>{finding}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Product Ideas */}
      <Card className="research-card">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Innovative Product Ideas</h3>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {research.productIdeas.map((idea, index) => (
              <div 
                key={index} 
                className="border border-gray-200 dark:border-primary-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
              >
                <h4 className="font-medium text-gray-900 dark:text-white">{idea.title}</h4>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{idea.description}</p>
                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-primary-700">
                  <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-none">
                    Potential Impact
                  </Badge>
                  <p className="mt-1 text-sm text-gray-600 italic dark:text-gray-400">{idea.potentialImpact}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Future Directions */}
      <Card className="research-card">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Future Directions</h3>
          <p className="text-gray-600 dark:text-gray-300">{research.futureDirections}</p>
        </CardContent>
      </Card>
    </div>
  );
}
