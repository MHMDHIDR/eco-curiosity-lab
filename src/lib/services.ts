import { api } from './api'

// Types (matching your Laravel backend structure)
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
  created_at: string
  updated_at: string
}

export interface Ecosystem {
  id: number
  name: string
  description: string
  image: string
  characteristics: string[]
  slug: string
  species: Species[]
  created_at: string
  updated_at: string
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
  update: (slug: string, data: Partial<Species>) =>
    api.patch<{ data: Species }>(`/species/${slug}`, data),
  delete: (slug: string) => api.delete(`/species/${slug}`),
  getMySpecies: () => api.get<{ data: Species[] }>('/my-species'),
}

export const contributionService = {
  getAll: (params?: { status?: string; type?: string }) =>
    api.get<{ data: Contribution[] }>('/contributions', { params }),
  getMyContributions: () => api.get<{ data: Contribution[] }>('/my-contributions'),
  getById: (id: number) => api.get<{ data: Contribution }>(`/contributions/${id}`),
  create: (data: Partial<Contribution>) =>
    api.post<{ data: Contribution }>('/contributions', data),
  update: (id: number, data: Partial<Contribution>) =>
    api.patch<{ data: Contribution }>(`/contributions/${id}`, data),
  delete: (id: number) => api.delete(`/contributions/${id}`),
  approve: (id: number, notes?: string) =>
    api.post(`/contributions/${id}/approve`, { notes }),
  reject: (id: number, notes?: string) =>
    api.post(`/contributions/${id}/reject`, { notes }),
}
