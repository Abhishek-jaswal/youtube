import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Upload, Download, Eye, ThumbsUp, Share, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VideoContent {
  id: string;
  title: string;
  script: string;
  visuals: string[];
  voiceover_url?: string;
  thumbnail: string;
  performance_prediction: {
    engagement_score: number;
    viral_potential: number;
    retention_score: number;
  };
}

interface VideoPreviewProps {
  videos: VideoContent[];
}

export function VideoPreview({ videos }: VideoPreviewProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoContent | null>(null);
  const { toast } = useToast();

  const uploadToYouTube = async (video: VideoContent) => {
    toast({
      title: "Upload Started",
      description: `Uploading "${video.title}" to YouTube...`
    });

    // Simulate upload process
    setTimeout(() => {
      toast({
        title: "Upload Successful!",
        description: "Your video has been uploaded to YouTube",
      });
    }, 3000);
  };

  const downloadVideo = (video: VideoContent) => {
    toast({
      title: "Download Started",
      description: `Downloading "${video.title}"...`
    });
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getPerformanceBadge = (score: number) => {
    if (score >= 80) return 'bg-success text-success-foreground';
    if (score >= 60) return 'bg-warning text-warning-foreground';
    return 'bg-destructive text-destructive-foreground';
  };

  if (videos.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Play className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No Videos Generated Yet</h3>
          <p className="text-muted-foreground">
            Generate content first to see video previews here
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Generated Videos ({videos.length})</h3>
        <div className="text-sm text-muted-foreground">
          Select 2-3 videos to upload to YouTube
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-muted flex items-center justify-center relative cursor-pointer"
                 onClick={() => setSelectedVideo(video)}>
              <Play className="w-12 h-12 text-primary" />
              <div className="absolute bottom-2 right-2">
                <Badge className={getPerformanceBadge(video.performance_prediction.engagement_score)}>
                  {video.performance_prediction.engagement_score}% predicted engagement
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4 space-y-4">
              <div>
                <h4 className="font-semibold line-clamp-2">{video.title}</h4>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center p-2 bg-muted rounded">
                  <div className={`font-semibold ${getPerformanceColor(video.performance_prediction.engagement_score)}`}>
                    {video.performance_prediction.engagement_score}%
                  </div>
                  <div className="text-muted-foreground">Engagement</div>
                </div>
                <div className="text-center p-2 bg-muted rounded">
                  <div className={`font-semibold ${getPerformanceColor(video.performance_prediction.viral_potential)}`}>
                    {video.performance_prediction.viral_potential}%
                  </div>
                  <div className="text-muted-foreground">Viral</div>
                </div>
                <div className="text-center p-2 bg-muted rounded">
                  <div className={`font-semibold ${getPerformanceColor(video.performance_prediction.retention_score)}`}>
                    {video.performance_prediction.retention_score}%
                  </div>
                  <div className="text-muted-foreground">Retention</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button size="sm" onClick={() => uploadToYouTube(video)} className="flex-1">
                  <Upload className="w-3 h-3 mr-1" />
                  Upload
                </Button>
                <Button size="sm" variant="outline" onClick={() => downloadVideo(video)}>
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed View Modal */}
      {selectedVideo && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Video Details: {selectedVideo.title}</span>
              <Button variant="outline" onClick={() => setSelectedVideo(null)}>
                Close
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Video Preview */}
              <div className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <Play className="w-16 h-16 text-primary" />
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload to YouTube
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>

              {/* Performance Analysis */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Performance Prediction
                </h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Engagement Score</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${selectedVideo.performance_prediction.engagement_score}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{selectedVideo.performance_prediction.engagement_score}%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Viral Potential</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div 
                          className="bg-creator-purple h-2 rounded-full" 
                          style={{ width: `${selectedVideo.performance_prediction.viral_potential}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{selectedVideo.performance_prediction.viral_potential}%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Retention Score</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div 
                          className="bg-creator-blue h-2 rounded-full" 
                          style={{ width: `${selectedVideo.performance_prediction.retention_score}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{selectedVideo.performance_prediction.retention_score}%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h5 className="font-medium mb-2">AI Recommendation</h5>
                  <p className="text-sm text-muted-foreground">
                    {selectedVideo.performance_prediction.engagement_score >= 80 
                      ? "🎯 High potential video! This content has strong viral indicators and should perform very well."
                      : selectedVideo.performance_prediction.engagement_score >= 60
                      ? "👍 Good potential. Consider optimizing the hook or thumbnail for better performance."
                      : "⚠️ Lower potential. Consider reworking the concept or trying a different approach."
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Script Preview */}
            <div className="space-y-2">
              <h4 className="font-semibold">Script</h4>
              <div className="p-4 bg-muted rounded-lg text-sm font-mono whitespace-pre-wrap max-h-40 overflow-y-auto">
                {selectedVideo.script}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}