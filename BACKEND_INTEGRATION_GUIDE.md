# Laravel Backend Integration Guide for Eco Curiosity Lab

## Overview

Your Laravel backend is now set up with:

- **Authentication**: Laravel Sanctum for API authentication
- **Database**: SQLite with migrations for ecosystems, species, and contributions
- **API Routes**: RESTful endpoints for all operations
- **Seeded Data**: All your existing ecosystem and species data

## Backend Status ✅

Your Laravel API is running on `http://localhost:8000` with the following endpoints:

### Public Endpoints (No Authentication Required)

- `GET /api/ecosystems` - Get all ecosystems with species
- `GET /api/ecosystems/{slug}` - Get specific ecosystem by slug
- `GET /api/species` - Get all species (with filters)
- `GET /api/species/{slug}` - Get specific species by slug
- `GET /api/search?q={query}` - Search species by name, scientific name, habitat, or type

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user (requires auth)
- `GET /api/user` - Get authenticated user info

### Protected Endpoints (Authentication Required)

- `POST /api/species` - Submit new species for review
- `GET /api/contributions` - Get user's contributions
- `POST /api/contributions` - Submit new contribution
- `GET /api/my-contributions` - Get current user's contributions

### Admin Endpoints

- `GET /api/admin/pending-species` - Get pending species for approval
- `PATCH /api/admin/species/{id}/approve` - Approve species
- `PATCH /api/admin/contributions/{id}/approve` - Approve contribution
- `PATCH /api/admin/contributions/{id}/reject` - Reject contribution

## Frontend Integration Steps

### 1. Install HTTP Client

First, install axios for API calls (if not already installed):

```bash
npm install axios
```

### 2. Create API Configuration

Create `src/lib/api.ts`:

```typescript
import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api'

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true, // Important for Sanctum
})

// Add auth token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle auth errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      // Redirect to login page
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

### 3. Create Authentication Context

Create `src/contexts/AuthContext.tsx`:

```typescript
import React, { createContext, useContext, useState, useEffect } from 'react'
import { api } from '@/lib/api'

interface User {
  id: number
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('user')

    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })
    const { user, token } = response.data

    localStorage.setItem('auth_token', token)
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  const register = async (
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => {
    const response = await api.post('/auth/register', {
      name,
      email,
      password,
      password_confirmation,
    })
    const { user, token } = response.data

    localStorage.setItem('auth_token', token)
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

### 4. Create API Service Functions

Create `src/lib/services.ts`:

```typescript
import { api } from './api'

// Types (matching your backend structure)
export interface Species {
  id: number
  name: string
  scientific_name: string
  image: string
  habitat: string
  diet: string
  fun_fact: string
  conservation_status: 'LC' | 'NT' | 'VU' | 'EN' | 'CR'
  type: 'mammal' | 'bird' | 'reptile' | 'amphibian' | 'fish' | 'plant' | 'insect'
  ecosystem: string
  sound?: string
  region?: string
  slug: string
  ecosystem_id: number
  user_id?: number
  is_approved: boolean
}

export interface Ecosystem {
  id: number
  name: string
  description: string
  image: string
  characteristics: string[]
  slug: string
  species: Species[]
}

export interface Contribution {
  id: number
  title: string
  description: string
  type: 'observation' | 'species_suggestion' | 'ecosystem_finding'
  data?: any
  image?: string
  location?: string
  status: 'pending' | 'approved' | 'rejected'
  admin_notes?: string
  created_at: string
  user: {
    id: number
    name: string
    email: string
  }
}

// API Functions
export const ecosystemService = {
  getAll: () => api.get<{ data: Ecosystem[] }>('/ecosystems'),
  getBySlug: (slug: string) => api.get<{ data: Ecosystem }>(`/ecosystems/${slug}`),
}

export const speciesService = {
  getAll: (params?: {
    ecosystem?: string
    type?: string
    conservation_status?: string
  }) => api.get<{ data: Species[] }>('/species', { params }),
  getBySlug: (slug: string) => api.get<{ data: Species }>(`/species/${slug}`),
  search: (query: string) => api.get<{ data: Species[] }>(`/search?q=${query}`),
  create: (data: Partial<Species>) => api.post<{ data: Species }>('/species', data),
}

export const contributionService = {
  getMyContributions: () => api.get<{ data: Contribution[] }>('/my-contributions'),
  create: (data: Partial<Contribution>) =>
    api.post<{ data: Contribution }>('/contributions', data),
  update: (id: number, data: Partial<Contribution>) =>
    api.patch<{ data: Contribution }>(`/contributions/${id}`, data),
  delete: (id: number) => api.delete(`/contributions/${id}`),
}
```

### 5. Update Your App.tsx

Wrap your app with the AuthProvider:

```typescript
import { AuthProvider } from '@/contexts/AuthContext'

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
```

### 6. Update Navigation Component

Update `src/components/Navigation.tsx` to include auth:

```typescript
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { User, LogIn, LogOut } from 'lucide-react'

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
```

### 7. Update Data Fetching

Replace your static data imports with API calls. For example, in `HomePage.tsx`:

```typescript
import { useQuery } from '@tanstack/react-query'
import { ecosystemService } from '@/lib/services'

export function HomePage() {
  const {
    data: ecosystemsResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['ecosystems'],
    queryFn: () => ecosystemService.getAll(),
  })

  const ecosystems = ecosystemsResponse?.data.data || []

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading ecosystems</div>

  // Rest of your component...
}
```

## Next Steps

1. **Create Login/Register Pages**: Add authentication forms
2. **Update All Pages**: Replace static data with API calls
3. **Add Contribution Features**: Allow users to submit species and observations
4. **Admin Panel**: Create admin interface for approving contributions
5. **Image Upload**: Implement file uploads for species images
6. **Error Handling**: Add proper error boundaries and loading states

## Development Commands

```bash
# Start Laravel API server
cd api && php artisan serve --port=8000

# Start React development server
npm run dev

# View API routes
cd api && php artisan route:list

# Reset database and re-seed
cd api && php artisan migrate:fresh --seed
```

Your backend is now ready and fully functional! The API maintains the same data structure as your frontend but with authentication and user contribution capabilities added.
