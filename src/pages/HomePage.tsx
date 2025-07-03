import { Button } from '@/components/ui/button'
import { EcosystemCard } from '@/components/EcosystemCard'
import { ecosystems } from '@/data/ecosystems'
import { useNavigate } from 'react-router-dom'
import heroImage from '@/assets/hero-ocean.jpg'
import { APP_NAME } from '@/lib/constants'

export function HomePage() {
  const navigate = useNavigate()

  const handleExploreEcosystem = (ecosystemId: string) => {
    navigate(`/ecosystem/${ecosystemId}`)
  }

  return (
    <div className='min-h-screen bg-background'>
      {/* Hero Section */}
      <section className='relative h-[60vh] md:h-[70vh] overflow-hidden'>
        <img
          src={heroImage}
          alt='Underwater coral reef'
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-r from-black/60 to-black/30' />

        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center text-white px-4 max-w-4xl'>
            <h1 className='text-4xl md:text-6xl font-bold mb-6 leading-tight'>
              Discover Earth's
              <span className='block bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent'>
                Amazing Biodiversity
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

      {/* Ecosystems Section */}
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

      {/* Call to Action */}
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
