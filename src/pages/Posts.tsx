
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useStore from '@/lib/store';
import { Post } from '@/lib/types';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Posts = () => {
  const { posts } = useStore();
  const [scheduledPosts, setScheduledPosts] = useState<Post[]>([]);
  const [publishedPosts, setPublishedPosts] = useState<Post[]>([]);
  const [draftPosts, setDraftPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    // Filter posts by status
    setScheduledPosts(
      posts
        .filter((post) => post.status === 'scheduled')
        .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
    );
    
    setPublishedPosts(
      posts
        .filter((post) => post.status === 'published')
        .sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime())
    );
    
    setDraftPosts(
      posts
        .filter((post) => post.status === 'draft')
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    );
  }, [posts]);

  return (
    <div className="min-h-screen bg-background pb-16">
      <Navbar />
      
      <main className="container pt-24 px-4">
        <div className="flex flex-col space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-2">
              <h2 className="text-xl font-medium">Manage Posts</h2>
              <p className="text-muted-foreground">
                View and manage all your Instagram posts
              </p>
            </div>
            
            <Link to="/create">
              <Button className="gap-1">
                <PlusCircle className="h-4 w-4" />
                <span>Create Post</span>
              </Button>
            </Link>
          </div>
          
          <Tabs defaultValue="scheduled" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="scheduled" className="relative">
                Scheduled
                {scheduledPosts.length > 0 && (
                  <span className="ml-1 text-xs bg-primary text-white rounded-full px-1.5 py-0.5">
                    {scheduledPosts.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="published">
                Published
                {publishedPosts.length > 0 && (
                  <span className="ml-1 text-xs bg-primary text-white rounded-full px-1.5 py-0.5">
                    {publishedPosts.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="drafts">
                Drafts
                {draftPosts.length > 0 && (
                  <span className="ml-1 text-xs bg-primary text-white rounded-full px-1.5 py-0.5">
                    {draftPosts.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="scheduled" className="animate-fade-in">
              {scheduledPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {scheduledPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 space-y-4">
                  <p className="text-muted-foreground text-center">
                    You don't have any scheduled posts.
                  </p>
                  <Link to="/create">
                    <Button>Schedule Your First Post</Button>
                  </Link>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="published" className="animate-fade-in">
              {publishedPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {publishedPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 space-y-4">
                  <p className="text-muted-foreground text-center">
                    You don't have any published posts yet.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="drafts" className="animate-fade-in">
              {draftPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {draftPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 space-y-4">
                  <p className="text-muted-foreground text-center">
                    You don't have any drafts.
                  </p>
                  <Link to="/create">
                    <Button>Create a Draft</Button>
                  </Link>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Posts;
