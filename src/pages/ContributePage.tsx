import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Upload, Check, AlertCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { contributionService } from '@/lib/services'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function ContributePage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'observation' as 'observation' | 'species_suggestion' | 'ecosystem_finding',
    image: '',
    location: '',
    data: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Mutation for creating contribution
  const createContributionMutation = useMutation({
    mutationFn: (data: any) => contributionService.create(data),
    onSuccess: () => {
      setSubmitSuccess(true)
      // Invalidate and refetch contributions data
      queryClient.invalidateQueries({ queryKey: ['user-contributions'] })
      // Redirect after a delay
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
    },
    onError: error => {
      console.error('Error submitting contribution:', error)
    },
  })

  // Redirect if not logged in
  if (!user) {
    navigate('/login', { state: { returnTo: '/contribute' } })
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
        data: formData.data ? JSON.parse(formData.data) : null,
      }

      await createContributionMutation.mutateAsync(submissionData)
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contributionTypes = [
    {
      value: 'observation',
      label: 'Wildlife Observation',
      description: 'Share a wildlife sighting or behavior observation',
    },
    {
      value: 'species_suggestion',
      label: 'Species Suggestion',
      description: 'Suggest a new species to be added to our database',
    },
    {
      value: 'ecosystem_finding',
      label: 'Ecosystem Finding',
      description: 'Report discoveries about ecosystems or habitats',
    },
  ]

  if (submitSuccess) {
    return (
      <div className='flex justify-center items-center min-h-screen bg-background'>
        <Card className='mx-4 w-full max-w-md'>
          <CardHeader className='text-center'>
            <Check className='mx-auto mb-4 w-12 h-12 text-green-500' />
            <CardTitle className='text-green-600'>Contribution Submitted!</CardTitle>
          </CardHeader>
          <CardContent className='text-center'>
            <p className='mb-4 text-muted-foreground'>
              Thank you for your contribution! Your submission has been sent for review.
              Our team will review it and get back to you soon.
            </p>
            <p className='text-sm text-muted-foreground'>
              Redirecting you to your dashboard...
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-background'>
      <div className='container px-4 py-8 mx-auto max-w-4xl'>
        {/* Header */}
        <div className='mb-8'>
          <Button variant='ghost' size='sm' onClick={() => navigate(-1)} className='mb-4'>
            <ArrowLeft className='mr-2 w-4 h-4' />
            Back
          </Button>

          <h1 className='mb-2 text-3xl font-bold'>Contribute to the Community</h1>
          <p className='mb-4 text-muted-foreground'>
            Help expand our knowledge base by sharing your observations, discoveries, and
            expertise.
          </p>

          <Card className='bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'>
            <CardContent className='pt-6'>
              <div className='flex gap-2 items-start'>
                <AlertCircle className='w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0' />
                <div className='text-sm text-blue-800 dark:text-blue-200'>
                  <p className='mb-1 font-medium'>Contribution Guidelines:</p>
                  <ul className='space-y-1 text-xs'>
                    <li>• Provide accurate and verifiable information</li>
                    <li>• Include location details when relevant</li>
                    <li>• Add photos or evidence when possible</li>
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
          {/* Contribution Type */}
          <Card>
            <CardHeader>
              <CardTitle className='text-xl'>Contribution Type</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor='type'>What type of contribution is this? *</Label>
              <Select
                value={formData.type}
                onValueChange={value => handleInputChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select contribution type' />
                </SelectTrigger>
                <SelectContent>
                  {contributionTypes.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      <div>
                        <div className='font-medium'>{option.label}</div>
                        <div className='text-xs text-muted-foreground'>
                          {option.description}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className='text-xl'>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <Label htmlFor='title'>Title *</Label>
                <Input
                  id='title'
                  value={formData.title}
                  onChange={e => handleInputChange('title', e.target.value)}
                  placeholder='e.g., Rare bird sighting in Central Park'
                  required
                />
              </div>

              <div>
                <Label htmlFor='description'>Description *</Label>
                <Textarea
                  id='description'
                  value={formData.description}
                  onChange={e => handleInputChange('description', e.target.value)}
                  placeholder='Provide detailed information about your observation or finding...'
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor='location'>Location</Label>
                <Input
                  id='location'
                  value={formData.location}
                  onChange={e => handleInputChange('location', e.target.value)}
                  placeholder='e.g., Central Park, New York City'
                />
                <p className='mt-1 text-xs text-muted-foreground'>
                  Where did you make this observation or discovery?
                </p>
              </div>

              <div>
                <Label htmlFor='image'>Image URL</Label>
                <Input
                  id='image'
                  value={formData.image}
                  onChange={e => handleInputChange('image', e.target.value)}
                  placeholder='https://example.com/image.jpg'
                />
                <p className='mt-1 text-xs text-muted-foreground'>
                  Optional: Provide a direct link to an image that supports your
                  contribution
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Data */}
          <Card>
            <CardHeader>
              <CardTitle className='text-xl'>Additional Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor='data'>Additional Data (JSON format)</Label>
                <Textarea
                  id='data'
                  value={formData.data}
                  onChange={e => handleInputChange('data', e.target.value)}
                  placeholder='{"weather": "sunny", "temperature": "22°C", "behavior": "feeding"}'
                  rows={4}
                />
                <p className='mt-1 text-xs text-muted-foreground'>
                  Optional: Provide any additional structured data in JSON format (e.g.,
                  weather conditions, measurements, etc.)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className='flex justify-end'>
            <Button
              type='submit'
              disabled={isSubmitting || createContributionMutation.isPending}
              className='min-w-[150px]'
            >
              {isSubmitting || createContributionMutation.isPending ? (
                <>
                  <div className='mr-2 w-4 h-4 rounded-full border-b-2 border-white animate-spin'></div>
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

          {createContributionMutation.isError && (
            <Card className='bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'>
              <CardContent className='pt-6'>
                <div className='flex gap-2'>
                  <AlertCircle className='flex-shrink-0 w-5 h-5 text-red-600' />
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
