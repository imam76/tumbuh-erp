import { useCallback, useMemo, useState } from 'react'
import { useI18n } from '@/i18n/useI18n'
import { categoryVisualMap, dashboardData } from '@/utils/dashboardModules'

function createListingId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `item-${Date.now()}`
}

export function useAmbilAjaDashboard() {
  const { t } = useI18n()
  const [user, setUser] = useState(dashboardData.user)
  const [listings, setListings] = useState(dashboardData.listings)
  const [incomingRequests, setIncomingRequests] = useState(
    dashboardData.incomingRequests,
  )

  const getListingTitle = useCallback(
    (item) => item.title ?? t(`dashboard.data.listings.${item.titleKey}`),
    [t],
  )

  const translateListing = useCallback(
    (item) => ({
      ...item,
      title: getListingTitle(item),
      category: t(`dashboard.categories.${item.categoryKey}`),
      condition: t(`dashboard.conditions.${item.conditionKey}`),
      timeAgo: item.timeAgo ?? t(`dashboard.timeAgo.${item.timeAgoKey}`),
    }),
    [getListingTitle, t],
  )

  const translateRequest = useCallback(
    (request) => ({
      ...request,
      itemName: t(`dashboard.data.requests.${request.itemNameKey}`),
      message: t(`dashboard.data.requests.${request.messageKey}`),
    }),
    [t],
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

    return translateListing(updatedItem)
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

    return translateListing(requestedItem)
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

    return translateRequest(updatedRequest)
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

    return translateRequest(updatedRequest)
  }

  const handleCreateListing = (values) => {
    const nextListing = {
      id: createListingId(),
      title: values.title.trim(),
      categoryKey: values.categoryKey,
      location: values.location,
      timeAgoKey: 'justNow',
      conditionKey: values.conditionKey,
      availability: 'tersedia',
      requestStatus: null,
      requestedByMe: false,
      saved: false,
      visual: categoryVisualMap[values.categoryKey] || 'desk',
      createdByMe: true,
    }

    setListings((currentListings) => [nextListing, ...currentListings])

    return translateListing(nextListing)
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
          ? {
              ...status,
              label: t(`dashboard.activityStatuses.${status.key}`),
              value: status.value + pendingRequestsByMe.length,
            }
          : {
              ...status,
              label: t(`dashboard.activityStatuses.${status.key}`),
            },
      ),
      latestRequest: pendingRequestsByMe[0]
        ? {
            itemName: getListingTitle(pendingRequestsByMe[0]),
            status: pendingRequestsByMe[0].requestStatus,
          }
        : {
            itemName: t(
              `dashboard.data.requests.${dashboardData.activity.latestRequest.itemNameKey}`,
            ),
            status: dashboardData.activity.latestRequest.status,
          },
    }
  }, [getListingTitle, listings, t])

  const categories = useMemo(
    () =>
      dashboardData.categories.map((category) => ({
        ...category,
        label: t(`dashboard.categories.${category.key}`),
      })),
    [t],
  )

  const communityImpact = useMemo(
    () =>
      dashboardData.communityImpact.map((item) => ({
        ...item,
        label: t(`dashboard.data.impact.${item.key}`),
        value: t(`dashboard.data.impactValues.${item.key}`),
      })),
    [t],
  )

  const hero = useMemo(
    () => ({
      title: t('dashboard.hero.title'),
      description: t('dashboard.hero.description'),
      primaryAction: t('dashboard.hero.primaryAction'),
      secondaryAction: t('dashboard.hero.secondaryAction'),
    }),
    [t],
  )

  return {
    activity,
    categories,
    communityImpact,
    hero,
    incomingRequests: incomingRequests.map(translateRequest),
    listings: listings.map(translateListing),
    user,
    handleApproveRequest,
    handleChangeLocation,
    handleCreateListing,
    handleRejectRequest,
    handleRequestItem,
    handleToggleSave,
  }
}
