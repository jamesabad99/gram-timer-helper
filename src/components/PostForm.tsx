
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import ImageUpload from './ImageUpload';
import useStore from '@/lib/store';
import { TimePickerDemo } from './TimePicker';

interface PostFormProps {
  onSubmit?: () => void;
}

const PostForm = ({ onSubmit }: PostFormProps) => {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  
  const navigate = useNavigate();
  const { addPost, updatePost, posts } = useStore();
  
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>(format(new Date(), 'HH:mm'));
  const [status, setStatus] = useState<'draft' | 'scheduled'>('scheduled');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editId) {
      const post = posts.find((p) => p.id === editId);
      if (post) {
        setImage(post.image);
        setCaption(post.caption);
        setDate(new Date(post.scheduledDate));
        setTime(format(new Date(post.scheduledDate), 'HH:mm'));
        setStatus(post.status === 'published' ? 'scheduled' : post.status);
      }
    }
  }, [editId, posts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!image) {
      toast.error('Please upload an image');
      return;
    }
    
    if (!caption) {
      toast.error('Please add a caption');
      return;
    }
    
    setIsSubmitting(true);
    
    // Combine date and time
    const [hours, minutes] = time.split(':').map(Number);
    const scheduledDate = new Date(date);
    scheduledDate.setHours(hours, minutes);
    
    try {
      if (editId) {
        updatePost(editId, {
          image,
          caption,
          scheduledDate,
          status,
        });
        toast.success('Post updated successfully');
      } else {
        addPost({
          image,
          caption,
          scheduledDate,
          status,
        });
        toast.success('Post scheduled successfully');
      }
      
      if (onSubmit) {
        onSubmit();
      }
      
      setTimeout(() => {
        navigate('/posts');
      }, 500);
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Post Image</h2>
          <ImageUpload value={image} onChange={setImage} />
        </div>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Caption</h2>
            <Textarea
              placeholder="Write your post caption here..."
              className="min-h-[120px] resize-none"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <div className="text-xs text-right text-muted-foreground">
              {caption.length} characters
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Schedule</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => newDate && setDate(newDate)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <div className="flex w-full gap-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    type="button"
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {time}
                  </Button>
                  <TimePickerDemo setTime={setTime} time={time} />
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Status</h2>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={status === 'scheduled' ? 'default' : 'outline'}
                onClick={() => setStatus('scheduled')}
                className={status === 'scheduled' ? 'bg-primary' : ''}
              >
                Schedule
              </Button>
              <Button
                type="button"
                variant={status === 'draft' ? 'default' : 'outline'}
                onClick={() => setStatus('draft')}
                className={status === 'draft' ? 'bg-primary' : ''}
              >
                Save as Draft
              </Button>
            </div>
          </div>
          
          <div className="pt-4 flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : editId ? 'Update Post' : 'Schedule Post'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
