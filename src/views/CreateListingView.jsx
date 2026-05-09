import { App as AntdApp } from 'antd'
import { useMemo } from 'react'
import { useNavigate } from 'react-router'
import { useI18n } from '@/i18n/useI18n'
import { paths } from '@/routes/paths'
import { dashboardData } from '@/utils/dashboardModules'
import { listingStatuses, mockListings } from '@/utils/mockListings'
import { UploadItemForm } from '@/views/dashboard/UploadItemForm'

const fallbackImageUrl =
  'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=900&q=80'

function createListingId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `my-listing-${Date.now()}`
}

export function CreateListingView() {
  const { message } = AntdApp.useApp()
  const { t } = useI18n()
  const navigate = useNavigate()

  const categories = useMemo(
    () =>
      dashboardData.categories.map((category) => ({
        ...category,
        label: t(`dashboard.categories.${category.key}`),
      })),
    [t],
  )

  const locations = useMemo(
    () => Array.from(new Set(mockListings.map((listing) => listing.location))),
    [],
  )

  const handleCancel = () => {
    navigate(paths.myListings)
  }

  const handleSubmit = (values) => {
    const firstPhoto = values.photos?.[0]?.originFileObj
    const createdListing = {
      id: createListingId(),
      imageUrl: firstPhoto ? URL.createObjectURL(firstPhoto) : fallbackImageUrl,
      location: values.location,
      name: values.title.trim(),
      postedAt: values.intent === 'draft' ? 'Draft tersimpan' : 'Baru saja',
      requestCount: 0,
      status: listingStatuses.available,
    }

    message.success(
      values.intent === 'draft'
        ? 'Draft barang berhasil disimpan'
        : 'Barang berhasil dibagikan',
    )
    navigate(paths.myListings, {
      state: { createdListing },
    })
  }

  return (
    <main className="mx-auto box-border w-full max-w-5xl px-6 py-6 max-md:px-4">
      <section className="mb-6">
        <h1 className="m-0 text-3xl font-bold tracking-normal text-slate-950 max-md:text-2xl">
          Bagikan Kebaikan Hari Ini
        </h1>
        <p className="mb-0 mt-2 text-base leading-7 text-slate-500">
          Isi detail barang yang ingin Anda berikan kepada komunitas AmbilAja.
        </p>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm max-md:p-4">
        <UploadItemForm
          categories={categories}
          defaultLocation={locations[0] || 'Jakarta Selatan'}
          locations={locations}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </section>
    </main>
  )
}
