import { Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useThemeContext } from '@/feature/theme';
import { Button } from '@/ui';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/playground', label: 'Playground' },
  { path: '/markdown', label: 'Markdown' },
  { path: '/guide', label: 'Guide' },
];

export function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useThemeContext();

  return (
    <nav className='bg-background/80 fixed top-0 right-0 left-0 z-50 mx-auto flex items-center justify-between px-4 py-2 backdrop-blur-sm'>
      <Link
        to='/'
        className='text-foreground hover:text-foreground/70 text-sm font-light tracking-wider transition-colors'
      >
        <img src={'/src/assets/w-3d.png'} className='h-10 w-10' />
      </Link>
      <div className='border-border flex items-center justify-center gap-2 rounded-full border px-1 py-1'>
        {navItems.map((item) => {
          const isActive = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`rounded-full px-2 py-1 text-xs font-light transition-all duration-200 ${
                isActive ? 'bg-[#6dff46] text-gray-900' : 'text-foreground/60 hover:text-foreground'
              } `}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      <Button onClick={toggleTheme} variant='ghost' size='icon' aria-label='Toggle theme'>
        {theme === 'light' ? <Sun className='h-4 w-4' /> : <Moon className='h-4 w-4' />}
      </Button>
    </nav>
  );
}
