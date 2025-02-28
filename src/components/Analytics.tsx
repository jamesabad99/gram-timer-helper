
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useStore from "@/lib/store";
import { TrendingUp, Calendar, Clock, Instagram } from "lucide-react";

const data = [
  {
    name: "Mon",
    total: 4,
  },
  {
    name: "Tue",
    total: 3,
  },
  {
    name: "Wed",
    total: 5,
  },
  {
    name: "Thu",
    total: 3,
  },
  {
    name: "Fri",
    total: 6,
  },
  {
    name: "Sat",
    total: 4,
  },
  {
    name: "Sun",
    total: 2,
  },
];

const Analytics = () => {
  const { analytics } = useStore();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="transition-apple hover:shadow-md animate-slide-up">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Scheduled Posts
          </CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.scheduled}</div>
          <p className="text-xs text-muted-foreground">
            +{Math.floor(Math.random() * 20)}% from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="transition-apple hover:shadow-md animate-slide-up" style={{ animationDelay: '50ms' }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Published Posts
          </CardTitle>
          <Instagram className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.published}</div>
          <p className="text-xs text-muted-foreground">
            +{Math.floor(Math.random() * 15)}% from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="transition-apple hover:shadow-md animate-slide-up" style={{ animationDelay: '100ms' }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Avg. Engagement
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.engagement}%</div>
          <p className="text-xs text-muted-foreground">
            +{analytics.growth}% from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="transition-apple hover:shadow-md animate-slide-up" style={{ animationDelay: '150ms' }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Best Time to Post
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">6:30 PM</div>
          <p className="text-xs text-muted-foreground">
            Based on your audience activity
          </p>
        </CardContent>
      </Card>
      
      <Card className="col-span-full transition-apple hover:shadow-md animate-slide-up" style={{ animationDelay: '200ms' }}>
        <CardHeader>
          <CardTitle>Weekly Activity</CardTitle>
          <CardDescription>
            Posts published per day this week
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                axisLine={false}
                tickLine={false}
                tickCount={5}
              />
              <Bar
                dataKey="total"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
