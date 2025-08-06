import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SpeciesCard } from '@/components/SpeciesCard'
import {
  ecosystemService,
  speciesService,
  type Species,
  type Ecosystem,
} from '@/lib/services'
import { Filter, ArrowLeft, Plus, AlertCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function EcosystemPage() {
  const { ecosystemSlug } = useParams<{ ecosystemSlug: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [favorites, setFavorites] = useState<string[]>([])

  // Fetch ecosystem data
  const {
    data: ecosystemsData,
    isLoading: isEcosystemsLoading,
    error: ecosystemsError,
  } = useQuery({
    queryKey: ['ecosystems'],
    queryFn: () => ecosystemService.getAll(),
  })

  // Fetch species for this ecosystem
  const {
    data: speciesData,
    isLoading: isSpeciesLoading,
    error: speciesError,
  } = useQuery({
    queryKey: ['species', ecosystemSlug],
    queryFn: () => speciesService.getAll({ ecosystem: ecosystemSlug }),
    enabled: !!ecosystemSlug,
  })

  const ecosystems = ecosystemsData?.data.data || []
  const allSpecies = speciesData?.data.data || []
  const ecosystem = ecosystems.find((e: Ecosystem) => e.slug === ecosystemSlug)

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('biodiversity-favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Filter species based on selected filters
  const filteredSpecies = allSpecies.filter((species: Species) => {
    if (statusFilter !== 'all' && species.conservation_status !== statusFilter) {
      return false
    }
    if (typeFilter !== 'all' && species.type !== typeFilter) {
      return false
    }
    return true
  })

  const handleViewSpecies = (speciesSlug: string) => {
    navigate(`/species/${speciesSlug}`)
  }

  const handleToggleFavorite = (speciesSlug: string) => {
    const newFavorites = favorites.includes(speciesSlug)
      ? favorites.filter(slug => slug !== speciesSlug)
      : [...favorites, speciesSlug]

    setFavorites(newFavorites)
    localStorage.setItem('biodiversity-favorites', JSON.stringify(newFavorites))
  }

  const handleContributeSpecies = () => {
    if (!user) {
      navigate('/login', {
        state: { returnTo: `/ecosystem/${ecosystemSlug}/contribute` },
      })
      return
    }
    navigate(`/ecosystem/${ecosystemSlug}/contribute`)
  }

  // Loading state
  if (isEcosystemsLoading || isSpeciesLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-center'>
          <div className='mx-auto mb-4 w-8 h-8 rounded-full border-b-2 animate-spin border-primary'></div>
          <p>Loading ecosystem data...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (ecosystemsError || speciesError) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-center'>
          <AlertCircle className='mx-auto mb-4 w-8 h-8 text-red-500' />
          <h1 className='mb-4 text-2xl font-bold'>Error loading data</h1>
          <p className='mb-4 text-muted-foreground'>
            {ecosystemsError?.message ||
              speciesError?.message ||
              'Failed to load ecosystem data'}
          </p>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    )
  }

  // Ecosystem not found
  if (!ecosystem) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-center'>
          <h1 className='mb-4 text-2xl font-bold'>Ecosystem not found</h1>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    )
  }

  const uniqueTypes = [...new Set(allSpecies.map((s: Species) => s.type))]
  const uniqueStatuses = [
    ...new Set(allSpecies.map((s: Species) => s.conservation_status)),
  ]

  return (
    <div className='min-h-screen bg-background'>
      {/* Hero Section */}
      <section className='relative h-[40vh] overflow-hidden'>
        <img
          src={ecosystem.image}
          alt={ecosystem.name}
          className='object-cover w-full h-full'
        />
        <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-black/30' />

        <div className='flex absolute inset-0 items-center'>
          <div className='container px-4 mx-auto'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => navigate('/')}
              className='mb-4 text-white hover:bg-white/20'
            >
              <ArrowLeft className='mr-2 w-4 h-4' />
              Back to Home
            </Button>

            <h1 className='mb-4 text-4xl font-bold text-white md:text-5xl'>
              {ecosystem.name}
            </h1>
            <p className='mb-6 max-w-2xl text-lg text-gray-200'>
              {ecosystem.description}
            </p>

            <div className='flex flex-wrap gap-2'>
              {ecosystem.characteristics.map((char: string, index: number) => (
                <Badge key={index} variant='secondary' className='text-white bg-white/20'>
                  {char}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className='px-4 py-8'>
        <div className='container mx-auto'>
          {/* Header with Contribute Button */}
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-bold'>Species in {ecosystem.name}</h2>
            {user && (
              <Button onClick={handleContributeSpecies}>
                <Plus className='mr-2 w-4 h-4' />
                Contribute Species
              </Button>
            )}
          </div>

          {/* Filters */}
          <div className='flex flex-wrap gap-4 items-center mb-8'>
            <div className='flex gap-2 items-center'>
              <Filter className='w-4 h-4' />
              <span className='text-sm font-medium'>Filter by:</span>
            </div>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className='w-[150px]'>
                <SelectValue placeholder='Animal Type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Types</SelectItem>
                {uniqueTypes.map((type: string) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Conservation Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Statuses</SelectItem>
                {uniqueStatuses.map((status: string) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className='text-sm text-muted-foreground'>
              Showing {filteredSpecies.length} of {allSpecies.length} species
            </div>
          </div>

          {/* Species Grid */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {filteredSpecies.map((species: Species) => (
              <SpeciesCard
                key={species.slug}
                species={{
                  id: species.slug,
                  name: species.name,
                  scientificName: species.scientific_name,
                  image: species.image,
                  habitat: species.habitat,
                  diet: species.diet,
                  funFact: species.fun_fact,
                  conservationStatus: species.conservation_status,
                  type: species.type,
                  ecosystem: species.ecosystem,
                  sound: species.sound,
                  region: species.region,
                }}
                onViewDetails={() => handleViewSpecies(species.slug)}
                isFavorited={favorites.includes(species.slug)}
                onToggleFavorite={() => handleToggleFavorite(species.slug)}
              />
            ))}
          </div>

          {filteredSpecies.length === 0 && (
            <div className='py-12 text-center'>
              <p className='mb-4 text-lg text-muted-foreground'>
                No species found matching your filters.
              </p>
              <div className='flex gap-4 justify-center'>
                <Button
                  variant='outline'
                  onClick={() => {
                    setStatusFilter('all')
                    setTypeFilter('all')
                  }}
                >
                  Clear Filters
                </Button>
                {user && (
                  <Button onClick={handleContributeSpecies}>
                    <Plus className='mr-2 w-4 h-4' />
                    Be the first to contribute!
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
