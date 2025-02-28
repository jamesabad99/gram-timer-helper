
import { useState } from 'react';
import { Calendar, MoreVertical, Edit, Trash2, Clock } from 'lucide-react';
import { Post } from '@/lib/types';
import { format } from 'date-fns';
import useStore from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { deletePost } = useStore();
  const { toast } = useToast();

  const handleDelete = () => {
    deletePost(post.id);
    toast({
      title: 'Post deleted',
      description: 'Your post has been successfully deleted.',
    });
  };

  const getStatusColor = (status: Post['status']) => {
    switch (status) {
      case 'published':
        return 'bg-green-500';
      case 'scheduled':
        return 'bg-amber-500';
      case 'draft':
        return 'bg-slate-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <div className="post-card group animate-scale">
      <div className="post-image">
        <div className={`absolute inset-0 bg-muted/30 ${isImageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`} />
        
        <img
          src={post.image}
          alt="Post"
          className={`w-full h-full object-cover transition-all duration-500 ${isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
          onLoad={() => setIsImageLoaded(true)}
        />
        
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1.5 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/30 transition-apple">
                <MoreVertical className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuItem asChild>
                <Link to={`/create?edit=${post.id}`} className="flex items-center cursor-pointer">
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="flex items-center text-destructive focus:text-destructive cursor-pointer">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="absolute bottom-2 left-2 px-2 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1.5" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className={`w-2 h-2 rounded-full ${getStatusColor(post.status)}`} />
          <span className="capitalize">{post.status}</span>
        </div>
      </div>
      
      <div className="post-content">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            <span>{format(new Date(post.scheduledDate), 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-3.5 h-3.5 mr-1.5" />
            <span>{format(new Date(post.scheduledDate), 'h:mm a')}</span>
          </div>
        </div>
        
        <p className="text-sm line-clamp-2">{post.caption}</p>
      </div>
    </div>
  );
};

export default PostCard;
