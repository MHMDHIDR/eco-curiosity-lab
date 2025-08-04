import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigation } from '@/components/Navigation'
import { HomePage } from '@/pages/HomePage'
import { EcosystemPage } from '@/pages/EcosystemPage'
import { Footer } from '@/components/Footer'
import { SpeciesPage } from '@/pages/SpeciesPage'
import { SearchPage } from '@/pages/SearchPage'
import { ExhibitPage } from '@/pages/ExhibitPage'
import { AboutPage } from '@/pages/AboutPage'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import NotFound from './pages/NotFound'
import { AuthProvider } from '@/contexts/AuthContext'

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className='min-h-screen flex flex-col'>
            <Navigation />
            <main className='flex-1'>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/ecosystem/:ecosystemId' element={<EcosystemPage />} />
                <Route path='/species/:speciesId' element={<SpeciesPage />} />
                <Route path='/search' element={<SearchPage />} />
                <Route path='/exhibit' element={<ExhibitPage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
)

export default App
