import { useMemo, useState } from 'react'
import { dashboardData } from '@/utils/dashboardModules'

const categoryVisualMap = {
  'Bayi & Anak': 'baby',
  Buku: 'shelf',
  Elektronik: 'electronics',
  Furniture: 'desk',
  Pakaian: 'clothes',
  'Rumah Tangga': 'tableware',
}

function createListingId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `item-${Date.now()}`
}

export function useAmbilAjaDashboard() {
  const [user, setUser] = useState(dashboardData.user)
  const [listings, setListings] = useState(dashboardData.listings)
  const [incomingRequests, setIncomingRequests] = useState(
    dashboardData.incomingRequests,
  )

  const handleToggleSave = (itemId) => {
    const selectedItem = listings.find((item) => item.id === itemId)

    if (!selectedItem) {
      return null
    }

    const updatedItem = { ...selectedItem, saved: !selectedItem.saved }
    setListings((currentListings) =>
      currentListings.map((item) =>
        item.id === itemId ? { ...item, saved: !item.saved } : item,
      ),
    )

    return updatedItem
  }

  const handleRequestItem = (itemId) => {
    const selectedItem = listings.find((item) => item.id === itemId)

    if (!selectedItem || selectedItem.requestStatus) {
      return null
    }

    const requestedItem = {
      ...selectedItem,
      availability: 'pending',
      requestStatus: 'pending',
      requestedByMe: true,
    }
    setListings((currentListings) =>
      currentListings.map((item) => {
        if (item.id !== itemId || item.requestStatus) {
          return item
        }

        return {
          ...item,
          availability: 'pending',
          requestStatus: 'pending',
          requestedByMe: true,
        }
      }),
    )

    return requestedItem
  }

  const handleApproveRequest = (requestId) => {
    const selectedRequest = incomingRequests.find(
      (request) => request.id === requestId,
    )

    if (!selectedRequest) {
      return null
    }

    const updatedRequest = { ...selectedRequest, status: 'approved' }
    setIncomingRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === requestId
          ? { ...request, status: 'approved' }
          : request,
      ),
    )

    return updatedRequest
  }

  const handleRejectRequest = (requestId) => {
    const selectedRequest = incomingRequests.find(
      (request) => request.id === requestId,
    )

    if (!selectedRequest) {
      return null
    }

    const updatedRequest = { ...selectedRequest, status: 'rejected' }
    setIncomingRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === requestId
          ? { ...request, status: 'rejected' }
          : request,
      ),
    )

    return updatedRequest
  }

  const handleCreateListing = (values) => {
    const nextListing = {
      id: createListingId(),
      title: values.title.trim(),
      category: values.category,
      location: values.location,
      timeAgo: 'Baru saja',
      condition: values.condition,
      availability: 'tersedia',
      requestStatus: null,
      requestedByMe: false,
      saved: false,
      visual: categoryVisualMap[values.category] || 'desk',
      createdByMe: true,
    }

    setListings((currentListings) => [nextListing, ...currentListings])

    return nextListing
  }

  const handleChangeLocation = (location) => {
    setUser((currentUser) => ({ ...currentUser, location }))

    return location
  }

  const activity = useMemo(() => {
    const requestsByMe = listings.filter((item) => item.requestedByMe)
    const uploadedByMe = listings.filter((item) => item.createdByMe)
    const pendingRequestsByMe = requestsByMe.filter(
      (item) => item.requestStatus === 'pending',
    )

    return {
      ...dashboardData.activity,
      listingsTotal:
        dashboardData.activity.listingsTotal + uploadedByMe.length,
      requestTotal:
        dashboardData.activity.requestTotal + requestsByMe.length,
      statuses: dashboardData.activity.statuses.map((status) =>
        status.key === 'pending'
          ? { ...status, value: status.value + pendingRequestsByMe.length }
          : status,
      ),
      latestRequest: pendingRequestsByMe[0]
        ? {
            itemName: pendingRequestsByMe[0].title,
            status: pendingRequestsByMe[0].requestStatus,
          }
        : dashboardData.activity.latestRequest,
    }
  }, [listings])

  return {
    activity,
    categories: dashboardData.categories,
    communityImpact: dashboardData.communityImpact,
    hero: dashboardData.hero,
    incomingRequests,
    listings,
    user,
    handleApproveRequest,
    handleChangeLocation,
    handleCreateListing,
    handleRejectRequest,
    handleRequestItem,
    handleToggleSave,
  }
}
