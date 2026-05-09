import { App as AntdApp, Modal, Select } from 'antd'
import { useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { useAmbilAjaDashboard } from '@/hooks/useAmbilAjaDashboard'
import { useI18n } from '@/i18n/useI18n'
import { paths } from '@/routes/paths'
import { CommunityImpactCard } from '@/views/dashboard/CommunityImpactCard'
import { DashboardHero } from '@/views/dashboard/DashboardHero'
import { IncomingRequestsCard } from '@/views/dashboard/IncomingRequestsCard'
import { MyActivityCard } from '@/views/dashboard/MyActivityCard'
import { NearbyItemsSection } from '@/views/dashboard/NearbyItemsSection'
import { PopularCategories } from '@/views/dashboard/PopularCategories'

export function DashboardView() {
  const { message } = AntdApp.useApp()
  const { t } = useI18n()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [draftLocation, setDraftLocation] = useState('')
  const itemsSectionRef = useRef(null)
  const {
    activity,
    categories,
    communityImpact,
    hero,
    incomingRequests,
    listings,
    user,
    handleApproveRequest,
    handleChangeLocation,
    handleRejectRequest,
    handleRequestItem,
    handleToggleSave,
  } = useAmbilAjaDashboard()
  const selectedCategoryKey = searchParams.get('category') || ''
  const searchTerm = searchParams.get('q')?.trim() || ''
  const selectedCategory = categories.find(
    (category) => category.key === selectedCategoryKey,
  )
  const selectedCategoryLabel = selectedCategory?.label || ''
  const action = searchParams.get('action')
  const isLocationOpen = isLocationModalOpen || action === 'location'

  const locationOptions = useMemo(
    () => Array.from(new Set([user.location, ...listings.map((item) => item.location)])),
    [listings, user.location],
  )

  const visibleListings = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase()

    return listings
      .filter((item) => {
        const matchesCategory =
          !selectedCategoryKey || item.categoryKey === selectedCategoryKey
        const matchesSearch =
          !normalizedSearch ||
          [item.title, item.category, item.location, item.condition].some(
            (value) => value.toLowerCase().includes(normalizedSearch),
          )

        return matchesCategory && matchesSearch
      })
      .sort((firstItem, secondItem) => {
        const firstIsNear = firstItem.location === user.location ? 1 : 0
        const secondIsNear = secondItem.location === user.location ? 1 : 0

        return secondIsNear - firstIsNear
      })
  }, [listings, searchTerm, selectedCategoryKey, user.location])

  const updateSearchParam = (key, value) => {
    const nextParams = new URLSearchParams(searchParams)

    if (value) {
      nextParams.set(key, value)
    } else {
      nextParams.delete(key)
    }

    setSearchParams(nextParams)
  }

  const clearActionParam = () => {
    if (!action) {
      return
    }

    const nextParams = new URLSearchParams(searchParams)
    nextParams.delete('action')
    setSearchParams(nextParams, { replace: true })
  }

  const scrollToItems = () => {
    itemsSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const handleSelectCategory = (categoryKey) => {
    updateSearchParam('category', categoryKey)
    scrollToItems()
  }

  const handleShowAllCategories = () => {
    updateSearchParam('category', '')
    scrollToItems()
  }

  const handleClearFilters = () => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.delete('category')
    nextParams.delete('q')
    setSearchParams(nextParams)
  }

  const handleOpenLocationModal = () => {
    setDraftLocation(user.location)
    setIsLocationModalOpen(true)
  }

  const handleSaveLocation = () => {
    const selectedLocation = draftLocation || user.location

    if (!selectedLocation) {
      return
    }

    const nextLocation = handleChangeLocation(selectedLocation)

    setIsLocationModalOpen(false)
    setDraftLocation('')
    clearActionParam()
    message.success(
      t('dashboard.messages.locationChanged', { location: nextLocation }),
    )
  }

  const handleCloseLocationModal = () => {
    setIsLocationModalOpen(false)
    setDraftLocation('')
    clearActionParam()
  }

  const handleRequestListing = (itemId) => {
    const requestedItem = handleRequestItem(itemId)

    if (requestedItem) {
      message.success(
        t('dashboard.messages.requestSent', { title: requestedItem.title }),
      )
      return
    }

    message.info(t('dashboard.messages.alreadyInProcess'))
  }

  const handleSaveListing = (itemId) => {
    const updatedItem = handleToggleSave(itemId)

    if (!updatedItem) {
      return
    }

    message.success(
      updatedItem.saved
        ? t('dashboard.messages.saved', { title: updatedItem.title })
        : t('dashboard.messages.unsaved', { title: updatedItem.title }),
    )
  }

  const handleApproveIncomingRequest = (requestId) => {
    const updatedRequest = handleApproveRequest(requestId)

    if (updatedRequest) {
      message.success(
        t('dashboard.messages.requestApproved', {
          requester: updatedRequest.requester,
        }),
      )
    }
  }

  const handleRejectIncomingRequest = (requestId) => {
    const updatedRequest = handleRejectRequest(requestId)

    if (updatedRequest) {
      message.info(
        t('dashboard.messages.requestRejected', {
          requester: updatedRequest.requester,
        }),
      )
    }
  }

  return (
    <main className="mx-auto box-border w-full max-w-7xl space-y-10 px-6 py-6 max-md:px-4">
      <DashboardHero
        hero={hero}
        onBrowseItems={scrollToItems}
        onUploadItem={() => navigate(paths.createListing)}
      />

      <section className="grid grid-cols-3 gap-4 max-xl:grid-cols-2 max-lg:grid-cols-1">
        <CommunityImpactCard stats={communityImpact} />
        <IncomingRequestsCard
          requests={incomingRequests}
          onApprove={handleApproveIncomingRequest}
          onReject={handleRejectIncomingRequest}
        />
        <MyActivityCard activity={activity} />
      </section>

      <PopularCategories
        activeCategoryKey={selectedCategoryKey}
        categories={categories}
        onSelectCategory={handleSelectCategory}
        onShowAll={handleShowAllCategories}
      />

      <NearbyItemsSection
        hasActiveFilters={Boolean(searchTerm || selectedCategoryKey)}
        listings={visibleListings}
        location={user.location}
        searchTerm={searchTerm}
        sectionRef={itemsSectionRef}
        selectedCategoryLabel={selectedCategoryLabel}
        onChangeLocation={handleOpenLocationModal}
        onClearFilters={handleClearFilters}
        onRequestItem={handleRequestListing}
        onToggleSave={handleSaveListing}
      />

      <Modal
        cancelText={t('dashboard.actions.cancel')}
        okText={t('dashboard.actions.save')}
        open={isLocationOpen}
        title={t('dashboard.modals.locationTitle')}
        onCancel={handleCloseLocationModal}
        onOk={handleSaveLocation}
      >
        <Select
          className="w-full"
          options={locationOptions.map((location) => ({
            label: location,
            value: location,
          }))}
          value={draftLocation || user.location}
          onChange={setDraftLocation}
        />
      </Modal>
    </main>
  )
}
