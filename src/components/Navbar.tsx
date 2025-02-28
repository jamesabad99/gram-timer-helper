
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Calendar, PlusCircle, ImageIcon } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50 glass border-b border-slate-200/20 h-16">
      <div className="container mx-auto flex items-center justify-between h-full px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center">
            <ImageIcon className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-xl font-medium">PostScheduler</h1>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" active={isActive('/')}>
            <LayoutGrid className="w-4 h-4 mr-2" />
            Dashboard
          </NavLink>
          <NavLink to="/calendar" active={isActive('/calendar')}>
            <Calendar className="w-4 h-4 mr-2" />
            Calendar
          </NavLink>
          <NavLink to="/posts" active={isActive('/posts')}>
            <ImageIcon className="w-4 h-4 mr-2" />
            Posts
          </NavLink>
        </nav>
        
        <div className="flex items-center">
          <Link
            to="/create"
            className="flex items-center gap-2 bg-primary rounded-full px-4 py-2 text-white font-medium transition-apple hover:bg-primary/90"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden md:inline">Create Post</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const NavLink = ({ 
  to, 
  active, 
  children 
}: { 
  to: string; 
  active: boolean; 
  children: React.ReactNode;
}) => {
  return (
    <Link
      to={to}
      className={`flex items-center py-2 px-3 rounded-full transition-apple ${
        active
          ? 'bg-secondary text-foreground font-medium'
          : 'text-foreground/70 hover:text-foreground hover:bg-secondary/50'
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;
