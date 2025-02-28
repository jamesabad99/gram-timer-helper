
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Analytics from '@/components/Analytics';
import PostCard from '@/components/PostCard';
import { Post } from '@/lib/types';
import useStore from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { posts } = useStore();
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    // Get posts sorted by scheduled date (newest first)
    const sorted = [...posts]
      .sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime())
      .slice(0, 4);
    
    setRecentPosts(sorted);
  }, [posts]);

  return (
    <div className="min-h-screen bg-background pb-16">
      <Navbar />
      
      <main className="container pt-24 px-4">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col space-y-2">
            <h2 className="text-xl font-medium">Analytics Overview</h2>
            <p className="text-muted-foreground">
              Track your Instagram scheduling performance
            </p>
          </div>
          
          <Analytics />
          
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-medium">Recent Posts</h2>
                <p className="text-sm text-muted-foreground">
                  Your latest Instagram scheduled posts
                </p>
              </div>
              
              <Link to="/create">
                <Button className="gap-1">
                  <Plus className="h-4 w-4" /> New Post
                </Button>
              </Link>
            </div>
            
            {recentPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recentPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <p className="text-muted-foreground text-center">
                  You haven't scheduled any posts yet.
                </p>
                <Link to="/create">
                  <Button>Create Your First Post</Button>
                </Link>
              </div>
            )}
            
            {recentPosts.length > 0 && (
              <div className="flex justify-center pt-4">
                <Link to="/posts">
                  <Button variant="outline">View All Posts</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
