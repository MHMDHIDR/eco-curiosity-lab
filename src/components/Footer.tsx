import { APP_NAME } from '@/lib/constants'
import { Link } from 'react-router-dom'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-gray-50 border-t border-gray-200 p-2.5'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center space-y-2'>
          <div className='text-gray-700'>
            <span className='font-semibold text-emerald-700'>{APP_NAME}</span>
            <span className='mx-2'>©</span>
            <span>{currentYear}</span>
            <span className='mx-2'>•</span>
            <span className='text-gray-600'>public community</span>
          </div>

          <div className='text-sm text-gray-500'>
            <span>Builder </span>
            <Link
              to='https://mohammedhaydar.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-emerald-600 hover:text-emerald-700 transition-colors duration-200 font-medium'
            >
              Mohammed Haydar
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
