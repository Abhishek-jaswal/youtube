import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

import { 
  Play, 
  Download, 
  Sparkles, 
  Video, 
  Music, 
  TrendingUp, 
  FileText,
  Mic,
  Eye,
  CheckCircle
} from "lucide-react";

interface GenerationStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
}

const TopicToViralGenerator = () => {
  const { toast } = useToast();
  const [topic, setTopic] = useState("");
  const [script, setScript] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [engagement, setEngagement] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [steps, setSteps] = useState<GenerationStep[]>([
    {
      id: 'script',
      title: 'Generate Script',
      description: 'Creating engaging script from your topic',
      icon: FileText,
      status: 'pending',
      progress: 0
    },
    {
      id: 'audio',
      title: 'Create Audio',
      description: 'Converting script to professional voiceover',
      icon: Mic,
      status: 'pending',
      progress: 0
    },
    {
      id: 'video',
      title: 'Generate Video',
      description: 'Creating stunning visuals with your audio',
      icon: Video,
      status: 'pending',
      progress: 0
    },
    {
      id: 'engagement',
      title: 'Check Engagement',
      description: 'Analyzing potential YouTube performance',
      icon: TrendingUp,
      status: 'pending',
      progress: 0
    }
  ]);

  const updateStepStatus = (stepId: string, status: GenerationStep['status'], progress: number = 0) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, status, progress } : step
    ));
  };

  const simulateScriptGeneration = async () => {
    updateStepStatus('script', 'processing', 0);
    
    // Simulate AI script generation
    const sampleScript = `🎯 **${topic.toUpperCase()} - The Ultimate Guide**

Hey everyone! Today we're diving deep into ${topic} - and trust me, what I'm about to share will completely change your perspective!

🔥 **Hook:** Did you know that ${topic} has become one of the most searched topics this year? 

💡 **Main Content:**
- The surprising truth about ${topic} that nobody talks about
- 3 game-changing insights that will blow your mind
- Why experts are calling this the future of ${topic}
- The one mistake 90% of people make with ${topic}

🚀 **Call to Action:**
If this opened your eyes about ${topic}, smash that like button, subscribe for more mind-blowing content, and let me know in the comments what surprised you most!

#${topic.replace(/\s+/g, '')} #Viral #MustWatch`;

    // Simulate typing effect
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      updateStepStatus('script', 'processing', i);
    }
    
    setScript(sampleScript);
    updateStepStatus('script', 'completed', 100);
    
    toast({
      title: "Script Generated!",
      description: "Your viral script is ready for audio conversion.",
    });
  };

  const simulateAudioGeneration = async () => {
    updateStepStatus('audio', 'processing', 0);
    
    // Simulate audio generation progress
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 150));
      updateStepStatus('audio', 'processing', i);
    }
    
    // In a real implementation, you'd use ElevenLabs here
    setAudioUrl("/placeholder-audio.mp3");
    updateStepStatus('audio', 'completed', 100);
    
    toast({
      title: "Audio Generated!",
      description: "Professional voiceover created successfully.",
    });
  };

  const simulateVideoGeneration = async () => {
    updateStepStatus('video', 'processing', 0);
    
    // Simulate video generation progress
    for (let i = 0; i <= 100; i += 3) {
      await new Promise(resolve => setTimeout(resolve, 200));
      updateStepStatus('video', 'processing', i);
    }
    
    // In a real implementation, you'd combine audio with generated visuals
    setVideoUrl("/placeholder-video.mp4");
    updateStepStatus('video', 'completed', 100);
    
    toast({
      title: "Video Generated!",
      description: "Your viral video is ready for engagement check.",
    });
  };

  const simulateEngagementCheck = async () => {
    updateStepStatus('engagement', 'processing', 0);
    
    // Simulate engagement analysis
    for (let i = 0; i <= 100; i += 8) {
      await new Promise(resolve => setTimeout(resolve, 100));
      updateStepStatus('engagement', 'processing', i);
    }
    
    // Generate random engagement score (80-95% for demo)
    const engagementScore = Math.floor(Math.random() * 15) + 80;
    setEngagement(engagementScore);
    updateStepStatus('engagement', 'completed', 100);
    
    if (engagementScore >= 85) {
      toast({
        title: "🎉 High Engagement Predicted!",
        description: `${engagementScore}% engagement score - Video ready for download!`,
      });
    } else {
      toast({
        title: "Engagement Below Threshold",
        description: `${engagementScore}% engagement - Consider refining your content.`,
        variant: "destructive"
      });
    }
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic to generate content.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setCurrentStep(0);

    try {
      setCurrentStep(1);
      await simulateScriptGeneration();
      
      setCurrentStep(2);
      await simulateAudioGeneration();
      
      setCurrentStep(3);
      await simulateVideoGeneration();
      
      setCurrentStep(4);
      await simulateEngagementCheck();
      
    } catch (error) {
      toast({
        title: "Generation Error",
        description: "Something went wrong during content generation.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (engagement >= 85) {
      toast({
        title: "Download Started",
        description: "Your viral video is being downloaded!",
      });
      // In real implementation, trigger actual download
    } else {
      toast({
        title: "Download Blocked",
        description: "Engagement must be 85% or higher to download.",
        variant: "destructive"
      });
    }
  };

  const getStepIcon = (step: GenerationStep) => {
    const IconComponent = step.icon;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
              Topic to Viral
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform any topic into viral video content with AI-powered script generation, 
            professional voiceover, stunning visuals, and engagement prediction.
          </p>
        </div>

        {/* Topic Input */}
        <Card className="p-6 shadow-card border-primary/20">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Enter Your Topic</label>
              <div className="flex gap-3">
                <Input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Artificial Intelligence, Crypto, Fitness, Travel..."
                  className="flex-1 bg-secondary border-primary/20 focus:border-primary"
                  disabled={isGenerating}
                />
                <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !topic.trim()}
                  variant="hero"
                  className="min-w-[140px]"
                >
                  {isGenerating ? (
                    <>
                      <Play className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Generation Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <Card 
              key={step.id} 
              className={`p-4 border transition-all duration-500 ${
                step.status === 'completed' 
                  ? 'border-green-500/50 bg-green-500/5' 
                  : step.status === 'processing'
                  ? 'border-primary/50 bg-primary/5 shadow-glow'
                  : 'border-primary/20'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStepIcon(step)}
                    <Badge 
                      variant={
                        step.status === 'completed' ? 'default' :
                        step.status === 'processing' ? 'secondary' : 
                        'outline'
                      }
                      className={
                        step.status === 'completed' ? 'bg-green-500 text-white' :
                        step.status === 'processing' ? 'gradient-primary text-white' :
                        ''
                      }
                    >
                      {step.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {step.status}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-sm">{step.title}</h3>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                
                {step.status === 'processing' && (
                  <Progress value={step.progress} className="h-2" />
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Generated Content */}
        {script && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Script */}
            <Card className="p-6 shadow-card">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Generated Script</h3>
                </div>
                <Textarea
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  className="min-h-[300px] bg-secondary border-primary/20 resize-none"
                  placeholder="Your generated script will appear here..."
                />
              </div>
            </Card>

            {/* Results Panel */}
            <Card className="p-6 shadow-card">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Generation Results</h3>
                </div>

                {/* Audio */}
                {audioUrl && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">Audio Generated</span>
                      <Badge variant="default" className="bg-green-500">Ready</Badge>
                    </div>
                    <div className="bg-secondary rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">Professional voiceover created with AI</p>
                    </div>
                  </div>
                )}

                {/* Video */}
                {videoUrl && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">Video Generated</span>
                      <Badge variant="default" className="bg-blue-500">Ready</Badge>
                    </div>
                    <div className="bg-secondary rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">HD video with synchronized audio and visuals</p>
                    </div>
                  </div>
                )}

                {/* Engagement */}
                {engagement > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Engagement Prediction</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Predicted Engagement</span>
                        <Badge 
                          variant={engagement >= 85 ? "default" : "destructive"}
                          className={engagement >= 85 ? "bg-green-500" : ""}
                        >
                          {engagement}%
                        </Badge>
                      </div>
                      <Progress value={engagement} className="h-3" />
                      <p className="text-xs text-muted-foreground">
                        {engagement >= 85 
                          ? "🎉 High viral potential! Ready for download." 
                          : "⚠️ Below 85% threshold. Consider refining content."
                        }
                      </p>
                    </div>
                  </div>
                )}

                {/* Download Button */}
                {engagement > 0 && (
                  <Button
                    onClick={handleDownload}
                    disabled={engagement < 85}
                    variant={engagement >= 85 ? "success" : "outline"}
                    className="w-full"
                  >
                    <Download className="w-4 h-4" />
                    {engagement >= 85 ? "Download Video" : "Engagement Too Low"}
                  </Button>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicToViralGenerator;