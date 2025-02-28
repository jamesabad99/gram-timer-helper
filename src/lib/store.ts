
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Post, AnalyticsData } from './types';
import { addDays, format } from 'date-fns';

interface StoreState {
  posts: Post[];
  analytics: AnalyticsData;
  addPost: (post: Omit<Post, 'id' | 'createdAt'>) => void;
  updatePost: (id: string, post: Partial<Post>) => void;
  deletePost: (id: string) => void;
  getPostsByDate: (date: Date) => Post[];
  getAllPosts: () => Post[];
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      posts: generateSamplePosts(), // Start with sample data
      analytics: {
        scheduled: 14,
        published: 28,
        engagement: 8.7,
        growth: 3.2,
      },
      addPost: (post) => {
        const newPost = {
          ...post,
          id: uuidv4(),
          createdAt: new Date(),
        };
        set((state) => ({
          posts: [...state.posts, newPost],
          analytics: {
            ...state.analytics,
            scheduled: state.analytics.scheduled + 1,
          },
        }));
      },
      updatePost: (id, updatedPost) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id ? { ...post, ...updatedPost } : post
          ),
        }));
      },
      deletePost: (id) => {
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
          analytics: {
            ...state.analytics,
            scheduled: state.analytics.scheduled - 1,
          },
        }));
      },
      getPostsByDate: (date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        return get().posts.filter(
          (post) => format(new Date(post.scheduledDate), 'yyyy-MM-dd') === formattedDate
        );
      },
      getAllPosts: () => {
        return get().posts;
      },
    }),
    {
      name: 'instagram-scheduler',
    }
  )
);

// Generate some sample posts for initial state
function generateSamplePosts(): Post[] {
  const sampleImages = [
    'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1499678329028-101435549a4e?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=500&auto=format&fit=crop',
  ];

  const sampleCaptions = [
    'Enjoying the beautiful sunset view! #sunset #views',
    'Exploring new places today! #travel #adventure',
    'Morning coffee vibes ☕ #coffee #morning',
    'Weekend getaway with friends! #weekend #friends',
    'New product launch coming soon! #newproduct #launch',
  ];

  return Array.from({ length: 10 }).map((_, index) => ({
    id: uuidv4(),
    image: sampleImages[index % sampleImages.length],
    caption: sampleCaptions[index % sampleCaptions.length],
    scheduledDate: addDays(new Date(), index),
    status: index % 3 === 0 ? 'published' : 'scheduled' as 'published' | 'scheduled',
    createdAt: new Date(),
  }));
}

export default useStore;
