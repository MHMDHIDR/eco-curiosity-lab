import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Ecosystem } from '@/lib/services'

interface EcosystemCardProps {
  ecosystem: Ecosystem
  onExplore: (ecosystemId: string) => void
}

export function EcosystemCard({ ecosystem, onExplore }: EcosystemCardProps) {
  return (
    <Card className='group overflow-hidden hover:shadow-ecosystem transition-all duration-300 hover:scale-105 cursor-pointer rounded-2xl border-none bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md'>
      <div className='relative h-48 overflow-hidden'>
        <img
          src={ecosystem.image}
          alt={ecosystem.name}
          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
        <div className='absolute bottom-4 left-4 right-4'>
          <h3 className='text-2xl font-extrabold text-white drop-shadow-lg mb-2 tracking-tight'>
            {ecosystem.name}
          </h3>
        </div>
      </div>
      <CardContent className='relative z-10 p-5 -mt-6 mx-1.5 rounded-xl bg-white/30 backdrop-blur-sm border border-white/30 shadow-lg flex flex-col gap-3'>
        <p className='text-gray-800 text-base font-medium mb-2 line-clamp-2 drop-shadow-sm'>
          {ecosystem.description}
        </p>
        <div className='flex items-center justify-between mt-2'>
          <span className='text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full shadow-sm'>
            {ecosystem.species.length} species
          </span>
          <Button
            variant='ecosystem'
            size='sm'
            onClick={() => onExplore(ecosystem.slug)}
            className='rounded-full px-5 py-2 font-semibold shadow-md bg-gradient-to-r from-blue-400 to-emerald-400 text-white hover:from-blue-500 hover:to-emerald-500 transition-colors duration-200'
          >
            Explore
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
