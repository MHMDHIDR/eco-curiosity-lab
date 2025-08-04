import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constants'
import { Search, BookOpen, Star, User, LogIn, LogOut } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export function Navigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()

  const isActive = (path: string) => location.pathname === path

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <nav className='border-b border-primary/20 shadow-xs bg-white/30 dark:bg-black/30 backdrop-blur-md sticky top-0 z-50'>
      <div className='container mx-auto px-4 py-2'>
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
            <span className='text-xl font-extrabold text-foreground'>{APP_NAME}</span>
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

            {user ? (
              <>
                <Button variant='ghost' size='sm' className='flex items-center space-x-1'>
                  <User className='h-4 w-4' />
                  <span className='hidden sm:inline'>{user.name}</span>
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={handleLogout}
                  className='flex items-center space-x-1'
                >
                  <LogOut className='h-4 w-4' />
                  <span className='hidden sm:inline'>Logout</span>
                </Button>
              </>
            ) : (
              <Button
                variant='ghost'
                size='sm'
                onClick={() => navigate('/login')}
                className='flex items-center space-x-1'
              >
                <LogIn className='h-4 w-4' />
                <span className='hidden sm:inline'>Login</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
