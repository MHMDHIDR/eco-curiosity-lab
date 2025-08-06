import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Upload, Check, AlertCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { ecosystemService, speciesService, type Species } from '@/lib/services'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function ContributeSpeciesPage() {
  const { ecosystemSlug } = useParams<{ ecosystemSlug: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const [formData, setFormData] = useState({
    name: '',
    scientific_name: '',
    image: '',
    habitat: '',
    diet: '',
    fun_fact: '',
    conservation_status: 'LC' as 'LC' | 'NT' | 'VU' | 'EN' | 'CR',
    type: 'mammal' as
      | 'mammal'
      | 'bird'
      | 'reptile'
      | 'amphibian'
      | 'fish'
      | 'plant'
      | 'insect',
    sound: '',
    region: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Fetch ecosystem data to show context
  const { data: ecosystemsData, isLoading } = useQuery({
    queryKey: ['ecosystems'],
    queryFn: () => ecosystemService.getAll(),
  })

  const ecosystem = ecosystemsData?.data.data?.find(e => e.slug === ecosystemSlug)

  // Mutation for creating species
  const createSpeciesMutation = useMutation({
    mutationFn: (data: Partial<Species>) => speciesService.create(data),
    onSuccess: () => {
      setSubmitSuccess(true)
      // Invalidate and refetch species data
      queryClient.invalidateQueries({ queryKey: ['species'] })
      // Redirect after a delay
      setTimeout(() => {
        navigate(`/ecosystem/${ecosystemSlug}`)
      }, 2000)
    },
    onError: error => {
      console.error('Error submitting species:', error)
    },
  })

  // Redirect if not logged in
  if (!user) {
    navigate('/login', { state: { returnTo: `/ecosystem/${ecosystemSlug}/contribute` } })
    return null
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const submissionData = {
        ...formData,
        ecosystem: ecosystemSlug,
        // Note: Backend will set is_approved to false for user contributions
      }

      await createSpeciesMutation.mutateAsync(submissionData)
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const conservationOptions = [
    { value: 'LC', label: 'Least Concern' },
    { value: 'NT', label: 'Near Threatened' },
    { value: 'VU', label: 'Vulnerable' },
    { value: 'EN', label: 'Endangered' },
    { value: 'CR', label: 'Critically Endangered' },
  ]

  const typeOptions = [
    { value: 'mammal', label: 'Mammal' },
    { value: 'bird', label: 'Bird' },
    { value: 'reptile', label: 'Reptile' },
    { value: 'amphibian', label: 'Amphibian' },
    { value: 'fish', label: 'Fish' },
    { value: 'plant', label: 'Plant' },
    { value: 'insect', label: 'Insect' },
  ]

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
      </div>
    )
  }

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

  if (submitSuccess) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <Card className='w-full max-w-md mx-4'>
          <CardHeader className='text-center'>
            <Check className='w-12 h-12 text-green-500 mx-auto mb-4' />
            <CardTitle className='text-green-600'>Contribution Submitted!</CardTitle>
          </CardHeader>
          <CardContent className='text-center'>
            <p className='text-muted-foreground mb-4'>
              Thank you for your contribution! Your species submission has been sent for
              review. Our team will review it and it will appear in the ecosystem once
              approved.
            </p>
            <p className='text-sm text-muted-foreground'>
              Redirecting you back to the ecosystem...
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8 max-w-4xl'>
        {/* Header */}
        <div className='mb-8'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => navigate(`/ecosystem/${ecosystemSlug}`)}
            className='mb-4'
          >
            <ArrowLeft className='mr-2 w-4 h-4' />
            Back to {ecosystem.name}
          </Button>

          <h1 className='text-3xl font-bold mb-2'>Contribute a Species</h1>
          <p className='text-muted-foreground mb-4'>
            Help expand our knowledge of <strong>{ecosystem.name}</strong> by contributing
            information about a species.
          </p>

          <Card className='bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'>
            <CardContent className='pt-6'>
              <div className='flex gap-2 items-start'>
                <AlertCircle className='w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0' />
                <div className='text-sm text-blue-800 dark:text-blue-200'>
                  <p className='font-medium mb-1'>Contribution Guidelines:</p>
                  <ul className='space-y-1 text-xs'>
                    <li>• Provide accurate and verifiable information</li>
                    <li>• Use high-quality images when possible</li>
                    <li>• Include scientific names for accuracy</li>
                    <li>
                      • Your contribution will be reviewed before appearing publicly
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className='text-xl'>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <Label htmlFor='name'>Common Name *</Label>
                  <Input
                    id='name'
                    value={formData.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    placeholder='e.g., Arctic Fox'
                    required
                  />
                </div>

                <div>
                  <Label htmlFor='scientific_name'>Scientific Name *</Label>
                  <Input
                    id='scientific_name'
                    value={formData.scientific_name}
                    onChange={e => handleInputChange('scientific_name', e.target.value)}
                    placeholder='e.g., Vulpes lagopus'
                    required
                  />
                </div>

                <div>
                  <Label htmlFor='type'>Animal Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={value => handleInputChange('type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select type' />
                    </SelectTrigger>
                    <SelectContent>
                      {typeOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor='conservation_status'>Conservation Status *</Label>
                  <Select
                    value={formData.conservation_status}
                    onValueChange={value =>
                      handleInputChange('conservation_status', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                    <SelectContent>
                      {conservationOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor='region'>Geographic Region</Label>
                  <Input
                    id='region'
                    value={formData.region}
                    onChange={e => handleInputChange('region', e.target.value)}
                    placeholder='e.g., Northern Canada, Siberia'
                  />
                </div>
              </CardContent>
            </Card>

            {/* Additional Details */}
            <Card>
              <CardHeader>
                <CardTitle className='text-xl'>Additional Details</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <Label htmlFor='image'>Image URL *</Label>
                  <Input
                    id='image'
                    value={formData.image}
                    onChange={e => handleInputChange('image', e.target.value)}
                    placeholder='https://example.com/image.jpg'
                    required
                  />
                  <p className='text-xs text-muted-foreground mt-1'>
                    Provide a direct link to a high-quality image of the species
                  </p>
                </div>

                <div>
                  <Label htmlFor='sound'>Sound/Call URL</Label>
                  <Input
                    id='sound'
                    value={formData.sound}
                    onChange={e => handleInputChange('sound', e.target.value)}
                    placeholder='https://example.com/sound.mp3'
                  />
                  <p className='text-xs text-muted-foreground mt-1'>
                    Optional: Link to audio recording of the species
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description Fields */}
          <Card>
            <CardHeader>
              <CardTitle className='text-xl'>Description</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <Label htmlFor='habitat'>Habitat *</Label>
                <Textarea
                  id='habitat'
                  value={formData.habitat}
                  onChange={e => handleInputChange('habitat', e.target.value)}
                  placeholder='Describe where this species lives and its preferred environment...'
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor='diet'>Diet *</Label>
                <Textarea
                  id='diet'
                  value={formData.diet}
                  onChange={e => handleInputChange('diet', e.target.value)}
                  placeholder='Describe what this species eats and its feeding habits...'
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor='fun_fact'>Fun Fact *</Label>
                <Textarea
                  id='fun_fact'
                  value={formData.fun_fact}
                  onChange={e => handleInputChange('fun_fact', e.target.value)}
                  placeholder='Share an interesting or surprising fact about this species...'
                  rows={3}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className='flex justify-end'>
            <Button
              type='submit'
              disabled={isSubmitting || createSpeciesMutation.isPending}
              className='min-w-[150px]'
            >
              {isSubmitting || createSpeciesMutation.isPending ? (
                <>
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Upload className='mr-2 w-4 h-4' />
                  Submit for Review
                </>
              )}
            </Button>
          </div>

          {createSpeciesMutation.isError && (
            <Card className='border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800'>
              <CardContent className='pt-6'>
                <div className='flex gap-2'>
                  <AlertCircle className='w-5 h-5 text-red-600 flex-shrink-0' />
                  <div className='text-sm text-red-800 dark:text-red-200'>
                    <p className='font-medium'>Submission Failed</p>
                    <p>
                      There was an error submitting your contribution. Please try again.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </div>
    </div>
  )
}
