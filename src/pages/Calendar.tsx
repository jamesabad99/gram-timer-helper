
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import CalendarView from '@/components/CalendarView';
import PostCard from '@/components/PostCard';
import { format } from 'date-fns';
import useStore from '@/lib/store';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { getPostsByDate } = useStore();
  
  const postsForSelectedDate = getPostsByDate(selectedDate);
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <Navbar />
      
      <main className="container pt-24 px-4">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col space-y-2">
            <h2 className="text-xl font-medium">Content Calendar</h2>
            <p className="text-muted-foreground">
              View and manage your scheduled Instagram posts
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CalendarView onSelectDay={setSelectedDate} />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  {format(selectedDate, 'MMMM d, yyyy')}
                </h3>
                
                <Link to="/create">
                  <Button size="sm" className="gap-1">
                    <PlusCircle className="h-4 w-4" />
                    <span>Add Post</span>
                  </Button>
                </Link>
              </div>
              
              {postsForSelectedDate.length > 0 ? (
                <div className="space-y-4">
                  {postsForSelectedDate.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 space-y-4 border border-dashed border-border rounded-lg">
                  <p className="text-muted-foreground text-center">
                    No posts scheduled for this date.
                  </p>
                  <Link to="/create">
                    <Button variant="outline" size="sm">Schedule a Post</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;
