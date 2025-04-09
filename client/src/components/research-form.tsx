import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  topic: z.string().min(3, {
    message: "Topic must be at least 3 characters.",
  }),
  detailed: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface ResearchFormProps {
  onSubmit: (data: FormValues) => void;
  isLoading: boolean;
}

export default function ResearchForm({ onSubmit, isLoading }: ResearchFormProps) {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      detailed: false,
    },
  });

  const handleSubmit = (values: FormValues) => {
    if (!values.topic.trim()) {
      setError("Please enter a research topic");
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    setError(null);
    onSubmit(values);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mb-8 dark:bg-primary-800">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-gray-700 dark:text-gray-300">Research Topic or Goal</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., Artificial Intelligence in Retail, Sustainable Urban Transportation" 
                    className="dark:bg-primary-700 dark:border-primary-600 dark:text-white"
                    {...field} 
                  />
                </FormControl>
                <FormDescription className="text-gray-500 dark:text-gray-400">
                  Be specific to get more targeted research and ideas
                </FormDescription>
              </FormItem>
            )}
          />

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="detailed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange}
                      className="dark:border-primary-600 dark:bg-primary-700"
                    />
                  </FormControl>
                  <FormLabel className="text-gray-700 dark:text-gray-300 text-sm font-normal">
                    Generate more detailed results
                  </FormLabel>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="bg-purple-600 hover:bg-purple-700">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Research...
                </>
              ) : (
                "Generate Research"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
