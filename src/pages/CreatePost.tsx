
import Navbar from '@/components/Navbar';
import PostForm from '@/components/PostForm';

const CreatePost = () => {
  return (
    <div className="min-h-screen bg-background pb-16">
      <Navbar />
      
      <main className="container pt-24 px-4">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col space-y-2">
            <h2 className="text-xl font-medium">Create New Post</h2>
            <p className="text-muted-foreground">
              Schedule a new post for your Instagram
            </p>
          </div>
          
          <div className="bg-card rounded-xl border border-border/50 p-6 shadow-sm">
            <PostForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatePost;
