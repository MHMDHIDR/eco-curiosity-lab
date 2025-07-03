import { useLocation, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { Search, Home, Compass, TreePine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const NotFound = () => {
  const location = useLocation()

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname
    )
  }, [location.pathname])

  return (
    <div className='min-h-screen bg-white'>
      <div className='relative h-[70vh] flex items-center justify-center overflow-hidden'>
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url('/placeholder.svg?height=800&width=1200')`,
            filter: 'brightness(0.7)',
          }}
        />

        <div className='absolute inset-0 bg-black/30' />

        <div className='relative z-10 text-center text-white px-4 max-w-4xl mx-auto'>
          <div className='mb-6'>
            <h1 className='text-8xl md:text-9xl font-bold mb-4 opacity-90'>404</h1>
          </div>

          <h2 className='text-4xl md:text-5xl font-bold mb-4'>
            Species Not Found in
            <br />
            <span className='bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'>
              This Habitat
            </span>
          </h2>

          <p className='text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed'>
            The page you're looking for seems to have migrated to a different ecosystem.
            Let's help you find your way back to exploring Earth's incredible
            biodiversity.
          </p>

          <Link to='/'>
            <Button className='bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg font-medium rounded-lg transition-all duration-200'>
              Start Exploring
            </Button>
          </Link>
        </div>
      </div>

      <div className='py-16 px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-12'>
            <h3 className='text-3xl font-bold text-gray-900 mb-4'>
              Continue Your Journey
            </h3>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Don't let this detour stop your exploration. Discover the unique species and
              ecosystems that make our planet extraordinary.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8 mb-16'>
            <Card className='group overflow-hidden rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
              <div className='relative h-48 bg-gradient-to-br from-blue-400 to-blue-600'>
                <div className='absolute inset-0 bg-black/20' />
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='text-center text-white'>
                    <div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3'>
                      <Search className='w-8 h-8' />
                    </div>
                    <h4 className='text-xl font-semibold'>Ocean</h4>
                  </div>
                </div>
              </div>
              <div className='p-6'>
                <p className='text-gray-600 mb-4'>
                  Dive deep into marine ecosystems and discover the incredible diversity
                  of ocean life.
                </p>
                <Link to='/ocean'>
                  <Button variant='outline' className='w-full bg-transparent'>
                    Explore Ocean
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className='group overflow-hidden rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
              <div className='relative h-48 bg-gradient-to-br from-green-400 to-emerald-600'>
                <div className='absolute inset-0 bg-black/20' />
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='text-center text-white'>
                    <div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3'>
                      <TreePine className='w-8 h-8' />
                    </div>
                    <h4 className='text-xl font-semibold'>Rainforest</h4>
                  </div>
                </div>
              </div>
              <div className='p-6'>
                <p className='text-gray-600 mb-4'>
                  Journey through lush rainforests and meet the species that call these
                  forests home.
                </p>
                <Link to='/rainforest'>
                  <Button variant='outline' className='w-full bg-transparent'>
                    Explore Rainforest
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className='group overflow-hidden rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
              <div className='relative h-48 bg-gradient-to-br from-orange-400 to-red-500'>
                <div className='absolute inset-0 bg-black/20' />
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='text-center text-white'>
                    <div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3'>
                      <Compass className='w-8 h-8' />
                    </div>
                    <h4 className='text-xl font-semibold'>Savanna</h4>
                  </div>
                </div>
              </div>
              <div className='p-6'>
                <p className='text-gray-600 mb-4'>
                  Experience the vast savannas and the magnificent wildlife that roams
                  these plains.
                </p>
                <Link to='/savanna'>
                  <Button variant='outline' className='w-full bg-transparent'>
                    Explore Savanna
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          <div className='text-center'>
            <div className='inline-flex items-center space-x-4 bg-gray-50 rounded-full px-6 py-3'>
              <Link
                to='/'
                className='flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors'
              >
                <Home className='w-4 h-4' />
                <span className='text-sm font-medium'>Home</span>
              </Link>
              <div className='w-px h-4 bg-gray-300' />
              <Link
                to='/search'
                className='flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors'
              >
                <Search className='w-4 h-4' />
                <span className='text-sm font-medium'>Search</span>
              </Link>
              <div className='w-px h-4 bg-gray-300' />
              <Link
                to='/about'
                className='flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors'
              >
                <Compass className='w-4 h-4' />
                <span className='text-sm font-medium'>About</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
