
export interface Post {
  id: string;
  image: string;
  caption: string;
  scheduledDate: Date;
  status: 'draft' | 'scheduled' | 'published';
  createdAt: Date;
}

export interface CalendarDay {
  date: Date;
  posts: Post[];
  isCurrentMonth: boolean;
  isToday: boolean;
}

export interface AnalyticsData {
  scheduled: number;
  published: number;
  engagement: number;
  growth: number;
}
