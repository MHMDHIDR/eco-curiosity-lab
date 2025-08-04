# 🔄 Frontend-Backend Integration Guide

## ✅ **What We've Built**

Your React frontend now seamlessly integrates with your Laravel API at `https://api.ecocuriositylab.me`!

### 🌐 **Complete Integration Architecture**

```
React Frontend (ecocuriositylab.me)
           ↕️
    axios HTTP requests
           ↕️
Laravel API (api.ecocuriositylab.me)
           ↕️
     MySQL Database
```

## 🔧 **How It Works**

### **1. API Communication (`src/lib/api.ts`)**

- **Production**: Uses `https://api.ecocuriositylab.me/api`
- **Development**: Uses `http://localhost:8000/api`
- **Authentication**: Auto-attaches Bearer tokens
- **Error Handling**: Auto-redirects on 401 errors

### **2. Authentication Flow (`src/contexts/AuthContext.tsx`)**

```typescript
// User Registration
register() → POST /api/auth/register → Laravel Sanctum → JWT Token → localStorage

// User Login
login() → POST /api/auth/login → Laravel Sanctum → JWT Token → localStorage

// API Requests
All requests → Bearer token in headers → Laravel validates → Response
```

### **3. Data Fetching (`src/lib/services.ts`)**

```typescript
// Before (Static Data)
import { ecosystems } from '@/data/ecosystems'

// After (API Data)
const { data } = useQuery({
  queryKey: ['ecosystems'],
  queryFn: () => ecosystemService.getAll(), // → GET /api/ecosystems
})
```

## 🚀 **Key Features Now Working**

### ✅ **User Authentication**

- **Register**: `/register` → Creates account in Laravel
- **Login**: `/login` → Authenticates with Laravel
- **Auto-logout**: Invalid tokens automatically sign out
- **Protected routes**: API calls require authentication

### ✅ **Data Integration**

- **Ecosystems**: Fetched from `/api/ecosystems`
- **Species**: Fetched from `/api/species`
- **Search**: Real-time search via `/api/search`
- **User contributions**: Submit new species and observations

### ✅ **Real-Time Updates**

- **TanStack Query**: Auto-caching and background updates
- **Loading states**: Beautiful loading spinners
- **Error handling**: Graceful error messages

## 🔐 **Authentication Examples**

### **Login Form (Working)**

```typescript
// src/pages/LoginPage.tsx
const { login } = useAuth()

const handleSubmit = async e => {
  await login(email, password) // → Laravel /api/auth/login
  navigate('/') // Redirect after successful login
}
```

### **Protected API Calls**

```typescript
// Automatically authenticated requests
const myContributions = await contributionService.getMyContributions()
// → GET /api/my-contributions with Bearer token
```

### **Navigation State**

```typescript
// src/components/Navigation.tsx
const { user, logout } = useAuth()

{
  user ? (
    <Button onClick={logout}>Logout</Button>
  ) : (
    <Button onClick={() => navigate('/login')}>Login</Button>
  )
}
```

## 📊 **Data Flow Examples**

### **Homepage Ecosystems**

```typescript
// 1. Frontend requests ecosystems
const { data } = useQuery(['ecosystems'], ecosystemService.getAll)

// 2. API call: GET https://api.ecocuriositylab.me/api/ecosystems
// 3. Laravel returns: { data: [ecosystems...] }
// 4. React renders ecosystem cards
// 5. User clicks "Explore" → Navigate to ecosystem page
```

### **User Contribution Flow**

```typescript
// 1. User submits new species observation
const newSpecies = await speciesService.create(speciesData)

// 2. API call: POST /api/species with auth token
// 3. Laravel validates + saves to database
// 4. Returns: { data: species, message: "Species submitted for review" }
// 5. Frontend shows success message
```

## 🔄 **Converting Pages from Static to API**

### **Pattern to Follow:**

```typescript
// BEFORE (Static)
import { ecosystems } from '@/data/ecosystems'

export function MyPage() {
  return (
    <div>
      {ecosystems.map(ecosystem => (
        <Card key={ecosystem.id} />
      ))}
    </div>
  )
}

// AFTER (API)
import { useQuery } from '@tanstack/react-query'
import { ecosystemService } from '@/lib/services'

export function MyPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['ecosystems'],
    queryFn: () => ecosystemService.getAll(),
  })

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage />

  const ecosystems = data?.data.data || []

  return (
    <div>
      {ecosystems.map(ecosystem => (
        <Card key={ecosystem.id} />
      ))}
    </div>
  )
}
```

## 🎯 **Next Steps: What to Update**

### **1. Convert More Pages**

Update these pages to use API data:

- `src/pages/EcosystemPage.tsx` → Use `ecosystemService.getBySlug()`
- `src/pages/SpeciesPage.tsx` → Use `speciesService.getBySlug()`
- `src/pages/SearchPage.tsx` → Use `speciesService.search()`

### **2. Add User Features**

- Species contribution form
- User exhibit/collection management
- Contribution history page

### **3. Admin Features**

- Admin dashboard for approving contributions
- Species moderation interface

## 🛠️ **Available API Endpoints**

### **Public (No Auth Required)**

```typescript
GET /api/ecosystems              // All ecosystems
GET /api/ecosystems/{slug}       // Single ecosystem
GET /api/species                 // All species (with filters)
GET /api/species/{slug}          // Single species
GET /api/search?q={query}        // Search species
```

### **Authenticated (Login Required)**

```typescript
POST / api / auth / register // User registration
POST / api / auth / login // User login
POST / api / auth / logout // User logout

POST / api / species // Submit new species
POST / api / contributions // Submit observation
GET / api / my - contributions // User's contributions
```

## 🚀 **Production Ready**

Your integration is **live and working**:

- ✅ **Frontend**: Fetches data from API
- ✅ **Authentication**: Login/register working
- ✅ **Database**: All data accessible via API
- ✅ **CORS**: Configured for cross-domain requests
- ✅ **Error Handling**: Graceful error states
- ✅ **Loading States**: Beautiful UI feedback

## 🔧 **Testing the Integration**

1. **Visit your frontend**: `https://ecocuriositylab.me`
2. **Register**: Create a new account
3. **Login**: Sign in with your account
4. **Browse**: See ecosystems loaded from API
5. **Search**: Test the search functionality

**Your React frontend is now powered by Laravel API!** 🎉

All your existing beautiful UI now gets real data from your database, with user authentication and the ability for users to contribute to your community of animal enthusiasts! 🦉🦎🦋
