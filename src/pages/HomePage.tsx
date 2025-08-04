import { Button } from '@/components/ui/button'
import { EcosystemCard } from '@/components/EcosystemCard'
import { ecosystemService } from '@/lib/services'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import heroImage from '/assets/hero-ocean.jpg'
import { APP_NAME } from '@/lib/constants'
import { useState, useEffect } from 'react'

// List of hero videos in the public/hero-videos directory
const heroVideos = [
  '/hero-videos/jellyfish.mp4',
  '/hero-videos/frog.mp4',
  '/hero-videos/tiny-bird.mp4',
  '/hero-videos/penguin.mp4',
]

export function HomePage() {
  const navigate = useNavigate()

  // Fetch ecosystems from API
  const {
    data: ecosystemsResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['ecosystems'],
    queryFn: () => ecosystemService.getAll(),
  })

  const ecosystems = ecosystemsResponse?.data.data || []

  // State for cycling videos
  const [videoIndex, setVideoIndex] = useState(() =>
    Math.floor(Math.random() * heroVideos.length)
  )
  const [videoFailed, setVideoFailed] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [fade, setFade] = useState(true)
  const FADE_DURATION = 500
  const CYCLE_INTERVAL = 10000

  // Cycle to a new random video every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setVideoIndex(Math.floor(Math.random() * heroVideos.length))
        setVideoFailed(false)
        setVideoLoaded(false)
        setFade(true)
      }, FADE_DURATION)
    }, CYCLE_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  const handleExploreEcosystem = (ecosystemId: string) => {
    navigate(`/ecosystem/${ecosystemId}`)
  }

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
          <p className='text-muted-foreground'>Loading ecosystems...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-red-500 mb-4'>Failed to load ecosystems</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative h-screen flex items-center justify-center overflow-hidden'>
        {/* Background Video */}
        <div className='absolute inset-0'>
          {!videoFailed && (
            <video
              key={videoIndex}
              autoPlay
              muted
              loop
              playsInline
              className={`w-full h-full object-cover transition-opacity duration-${FADE_DURATION} ${
                fade && videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoadedData={() => setVideoLoaded(true)}
              onError={() => setVideoFailed(true)}
            >
              <source src={heroVideos[videoIndex]} type='video/mp4' />
            </video>
          )}

          {/* Fallback Image */}
          <img
            src={heroImage}
            alt='Hero background'
            className={`w-full h-full object-cover transition-opacity duration-${FADE_DURATION} ${
              videoFailed || (!videoLoaded && fade) ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              position: videoFailed ? 'static' : 'absolute',
              top: 0,
              left: 0,
            }}
          />

          {/* Dark overlay for better text readability */}
          <div className='absolute inset-0 bg-black/40' />
        </div>

        {/* Hero Content */}
        <div className='relative z-10 text-center text-white px-4'>
          <div className='max-w-4xl mx-auto'>
            <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold mb-6'>
              Welcome to{' '}
              <span className='bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 bg-clip-text text-transparent'>
                {APP_NAME}
              </span>
            </h1>
            <p className='text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto'>
              Explore ecosystems, discover species, and learn about the incredible
              diversity of life on our planet.
            </p>
            <Button
              variant='hero'
              size='lg'
              onClick={() => navigate('/search')}
              className='text-lg px-8 py-3'
            >
              Start Exploring
            </Button>
          </div>
        </div>
      </section>

      <section className='py-16 px-4'>
        <div className='container mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>{APP_NAME}</h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Journey through diverse habitats and discover the unique species that call
              each ecosystem home.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {ecosystems.map(ecosystem => (
              <EcosystemCard
                key={ecosystem.id}
                ecosystem={ecosystem}
                onExplore={handleExploreEcosystem}
              />
            ))}
          </div>
        </div>
      </section>

      <section className='py-16 bg-muted'>
        <div className='container mx-auto text-center px-4'>
          <h2 className='text-3xl font-bold mb-4'>
            Ready to Create Your Digital Museum?
          </h2>
          <p className='text-lg text-muted-foreground mb-8 max-w-2xl mx-auto'>
            Save your favorite species and create your own curated collection to share
            with others.
          </p>
          <Button variant='ecosystem' size='lg' onClick={() => navigate('/exhibit')}>
            Build My Exhibit
          </Button>
        </div>
      </section>
    </div>
  )
}
