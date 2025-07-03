import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constants'
import { Search, BookOpen, Star } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

export function Navigation() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className='bg-card border-b shadow-sm sticky top-0 z-50'>
      <div className='container mx-auto px-4 py-3'>
        <div className='flex items-center justify-between'>
          <div
            className='flex items-center space-x-2 cursor-pointer group select-none'
            onClick={() => navigate('/')}
          >
            <div className='size-8 bg-gradient-hero-light rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all duration-300'>
              <span className='text-white font-bold text-lg'>
                <img src='/logo.png' alt='logo' className='size-8' />
              </span>
            </div>
            <span className='text-xl font-bold text-foreground'>{APP_NAME}</span>
          </div>

          <div className='flex items-center space-x-2'>
            <Button
              variant={isActive('/search') ? 'default' : 'ghost'}
              size='sm'
              onClick={() => navigate('/search')}
              className='flex items-center space-x-1'
            >
              <Search className='h-4 w-4' />
              <span className='hidden sm:inline'>Search</span>
            </Button>

            <Button
              variant={isActive('/exhibit') ? 'default' : 'ghost'}
              size='sm'
              onClick={() => navigate('/exhibit')}
              className='flex items-center space-x-1'
            >
              <Star className='h-4 w-4' />
              <span className='hidden sm:inline'>My Exhibit</span>
            </Button>

            <Button
              variant={isActive('/about') ? 'default' : 'ghost'}
              size='sm'
              onClick={() => navigate('/about')}
              className='flex items-center space-x-1'
            >
              <BookOpen className='h-4 w-4' />
              <span className='hidden sm:inline'>About</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
