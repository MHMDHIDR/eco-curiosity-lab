import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  User,
  Plus,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import {
  contributionService,
  speciesService,
  type Contribution,
  type Species,
} from '@/lib/services'

export function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  // Fetch user's contributions
  const { data: contributionsData, isLoading: isContributionsLoading } = useQuery({
    queryKey: ['user-contributions'],
    queryFn: () => contributionService.getMyContributions(),
    enabled: !!user,
  })

  // Fetch user's species submissions
  const { data: speciesData, isLoading: isSpeciesLoading } = useQuery({
    queryKey: ['user-species'],
    queryFn: () => speciesService.getMySpecies(),
    enabled: !!user,
  })

  if (!user) {
    navigate('/login')
    return null
  }

  const contributions = contributionsData?.data.data || []
  const species = speciesData?.data.data || []

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant='outline' className='text-yellow-600 border-yellow-300'>
            <Clock className='w-3 h-3 mr-1' />
            Pending
          </Badge>
        )
      case 'approved':
        return (
          <Badge variant='outline' className='text-green-600 border-green-300'>
            <CheckCircle className='w-3 h-3 mr-1' />
            Approved
          </Badge>
        )
      case 'rejected':
        return (
          <Badge variant='outline' className='text-red-600 border-red-300'>
            <XCircle className='w-3 h-3 mr-1' />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant='outline'>{status}</Badge>
    }
  }

  const getApprovalBadge = (isApproved: boolean) => {
    return isApproved ? (
      <Badge variant='outline' className='text-green-600 border-green-300'>
        <CheckCircle className='w-3 h-3 mr-1' />
        Approved
      </Badge>
    ) : (
      <Badge variant='outline' className='text-yellow-600 border-yellow-300'>
        <Clock className='w-3 h-3 mr-1' />
        Pending Review
      </Badge>
    )
  }

  const stats = {
    totalContributions: contributions.length,
    pendingContributions: contributions.filter(c => c.status === 'pending').length,
    approvedContributions: contributions.filter(c => c.status === 'approved').length,
    totalSpecies: species.length,
    pendingSpecies: species.filter(s => !s.is_approved).length,
    approvedSpecies: species.filter(s => s.is_approved).length,
  }

  if (isContributionsLoading || isSpeciesLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center gap-3 mb-2'>
            <User className='w-8 h-8 text-primary' />
            <h1 className='text-3xl font-bold'>My Dashboard</h1>
          </div>
          <p className='text-muted-foreground'>
            Welcome back, {user.name}! Manage your contributions and track your impact.
          </p>
        </div>

        {/* Stats Overview */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          <Card>
            <CardContent className='pt-6'>
              <div className='flex items-center gap-2'>
                <div className='p-2 bg-blue-100 rounded-lg dark:bg-blue-900'>
                  <Plus className='w-4 h-4 text-blue-600 dark:text-blue-400' />
                </div>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>
                    Total Contributions
                  </p>
                  <p className='text-2xl font-bold'>{stats.totalContributions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='pt-6'>
              <div className='flex items-center gap-2'>
                <div className='p-2 bg-green-100 rounded-lg dark:bg-green-900'>
                  <CheckCircle className='w-4 h-4 text-green-600 dark:text-green-400' />
                </div>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>Approved</p>
                  <p className='text-2xl font-bold'>
                    {stats.approvedContributions + stats.approvedSpecies}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='pt-6'>
              <div className='flex items-center gap-2'>
                <div className='p-2 bg-yellow-100 rounded-lg dark:bg-yellow-900'>
                  <Clock className='w-4 h-4 text-yellow-600 dark:text-yellow-400' />
                </div>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>
                    Pending Review
                  </p>
                  <p className='text-2xl font-bold'>
                    {stats.pendingContributions + stats.pendingSpecies}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='pt-6'>
              <div className='flex items-center gap-2'>
                <div className='p-2 bg-purple-100 rounded-lg dark:bg-purple-900'>
                  <User className='w-4 h-4 text-purple-600 dark:text-purple-400' />
                </div>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>
                    Species Added
                  </p>
                  <p className='text-2xl font-bold'>{stats.totalSpecies}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className='mb-6'>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='species'>My Species ({stats.totalSpecies})</TabsTrigger>
            <TabsTrigger value='contributions'>
              My Contributions ({stats.totalContributions})
            </TabsTrigger>
          </TabsList>

          <TabsContent value='overview' className='space-y-6'>
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <Button
                    onClick={() => navigate('/')}
                    className='justify-start h-auto p-4'
                    variant='outline'
                  >
                    <Plus className='mr-3 w-5 h-5' />
                    <div className='text-left'>
                      <div className='font-medium'>Contribute New Species</div>
                      <div className='text-sm text-muted-foreground'>
                        Add a species to an ecosystem
                      </div>
                    </div>
                  </Button>

                  <Button
                    onClick={() => navigate('/contribute')}
                    className='justify-start h-auto p-4'
                    variant='outline'
                  >
                    <Eye className='mr-3 w-5 h-5' />
                    <div className='text-left'>
                      <div className='font-medium'>Share Observation</div>
                      <div className='text-sm text-muted-foreground'>
                        Submit a wildlife observation
                      </div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {contributions.length === 0 && species.length === 0 ? (
                  <div className='text-center py-8'>
                    <AlertCircle className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
                    <h3 className='text-lg font-medium mb-2'>No contributions yet</h3>
                    <p className='text-muted-foreground mb-4'>
                      Start contributing to the Eco Curiosity Lab community!
                    </p>
                    <Button onClick={() => navigate('/')}>
                      <Plus className='mr-2 w-4 h-4' />
                      Make Your First Contribution
                    </Button>
                  </div>
                ) : (
                  <div className='space-y-4'>
                    {/* Show recent items */}
                    {[...species.slice(0, 3), ...contributions.slice(0, 3)]
                      .sort(
                        (a, b) =>
                          new Date(b.created_at).getTime() -
                          new Date(a.created_at).getTime()
                      )
                      .slice(0, 5)
                      .map((item, index) => (
                        <div
                          key={index}
                          className='flex items-center gap-4 p-4 border rounded-lg'
                        >
                          <div className='flex-1'>
                            <h4 className='font-medium'>
                              {'name' in item ? item.name : item.title}
                            </h4>
                            <p className='text-sm text-muted-foreground'>
                              {'scientific_name' in item
                                ? `Scientific name: ${item.scientific_name}`
                                : item.description}
                            </p>
                            <p className='text-xs text-muted-foreground'>
                              {new Date(item.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className='flex items-center gap-2'>
                            {'is_approved' in item
                              ? getApprovalBadge(item.is_approved)
                              : getStatusBadge(item.status)}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='species' className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle>My Species Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                {species.length === 0 ? (
                  <div className='text-center py-8'>
                    <AlertCircle className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
                    <h3 className='text-lg font-medium mb-2'>No species submitted yet</h3>
                    <p className='text-muted-foreground mb-4'>
                      Help expand our database by submitting species information.
                    </p>
                    <Button onClick={() => navigate('/')}>
                      <Plus className='mr-2 w-4 h-4' />
                      Submit First Species
                    </Button>
                  </div>
                ) : (
                  <div className='space-y-4'>
                    {species.map(item => (
                      <div
                        key={item.id}
                        className='flex items-center gap-4 p-4 border rounded-lg'
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className='w-16 h-16 object-cover rounded-lg'
                        />
                        <div className='flex-1'>
                          <h4 className='font-medium'>{item.name}</h4>
                          <p className='text-sm text-muted-foreground italic'>
                            {item.scientific_name}
                          </p>
                          <p className='text-sm text-muted-foreground'>
                            {item.ecosystem} • {item.type}
                          </p>
                          <p className='text-xs text-muted-foreground'>
                            Submitted {new Date(item.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className='flex items-center gap-2'>
                          {getApprovalBadge(item.is_approved)}
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() => navigate(`/species/${item.slug}`)}
                          >
                            <Eye className='w-4 h-4' />
                          </Button>
                          {!item.is_approved && (
                            <Button
                              size='sm'
                              variant='outline'
                              onClick={() => navigate(`/species/${item.slug}/edit`)}
                            >
                              <Edit className='w-4 h-4' />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='contributions' className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle>My Contributions</CardTitle>
              </CardHeader>
              <CardContent>
                {contributions.length === 0 ? (
                  <div className='text-center py-8'>
                    <AlertCircle className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
                    <h3 className='text-lg font-medium mb-2'>No contributions yet</h3>
                    <p className='text-muted-foreground mb-4'>
                      Share your wildlife observations and discoveries.
                    </p>
                    <Button onClick={() => navigate('/contribute')}>
                      <Plus className='mr-2 w-4 h-4' />
                      Submit First Observation
                    </Button>
                  </div>
                ) : (
                  <div className='space-y-4'>
                    {contributions.map(item => (
                      <div
                        key={item.id}
                        className='flex items-center gap-4 p-4 border rounded-lg'
                      >
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className='w-16 h-16 object-cover rounded-lg'
                          />
                        )}
                        <div className='flex-1'>
                          <h4 className='font-medium'>{item.title}</h4>
                          <p className='text-sm text-muted-foreground'>
                            {item.description}
                          </p>
                          <div className='flex items-center gap-2 mt-1'>
                            <Badge variant='outline' className='text-xs'>
                              {item.type.replace('_', ' ')}
                            </Badge>
                            {item.location && (
                              <span className='text-xs text-muted-foreground'>
                                📍 {item.location}
                              </span>
                            )}
                          </div>
                          <p className='text-xs text-muted-foreground'>
                            Submitted {new Date(item.created_at).toLocaleDateString()}
                          </p>
                          {item.admin_notes && (
                            <p className='text-xs text-blue-600 mt-1'>
                              Note: {item.admin_notes}
                            </p>
                          )}
                        </div>
                        <div className='flex items-center gap-2'>
                          {getStatusBadge(item.status)}
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() => navigate(`/contributions/${item.id}`)}
                          >
                            <Eye className='w-4 h-4' />
                          </Button>
                          {item.status === 'pending' && (
                            <Button
                              size='sm'
                              variant='outline'
                              onClick={() => navigate(`/contributions/${item.id}/edit`)}
                            >
                              <Edit className='w-4 h-4' />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
