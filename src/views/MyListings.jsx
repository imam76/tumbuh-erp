import {
  ClockCircleOutlined,
  EditOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  PlusOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { Button, Card, Segmented } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { paths } from '@/routes/paths'
import { listingStatuses, mockListings } from '@/utils/mockListings'

const filterOptions = [
  { label: 'Semua', value: 'all' },
  { label: 'Aktif', value: listingStatuses.available },
  { label: 'Dalam Proses', value: listingStatuses.processing },
  { label: 'Selesai', value: listingStatuses.completed },
]

const statusClassMap = {
  [listingStatuses.available]: 'bg-emerald-700 text-white',
  [listingStatuses.processing]: 'bg-amber-500 text-white',
  [listingStatuses.completed]: 'bg-slate-600 text-white',
}

function ListingCard({ listing }) {
  const actionLabel =
    listing.status === listingStatuses.available
      ? 'Kelola Permintaan'
      : listing.status === listingStatuses.processing
        ? 'Lihat Proses'
        : 'Lihat Riwayat'

  return (
    <Card
      className="overflow-hidden"
      styles={{ body: { padding: 0 } }}
      variant="outlined"
    >
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <img
          alt={listing.name}
          className="h-full w-full object-cover"
          loading="lazy"
          src={listing.imageUrl}
        />
        <div className="absolute left-4 top-4">
          <span
            className={`rounded-md px-3 py-1 text-xs font-bold shadow-sm ${
              statusClassMap[listing.status]
            }`}
          >
            {listing.status}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4 flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="m-0 text-lg font-bold leading-snug text-slate-950">
              {listing.name}
            </h2>
            <p className="mb-0 mt-2 flex items-center gap-2 text-sm text-slate-500">
              <ClockCircleOutlined />
              {listing.postedAt}
            </p>
          </div>
          <Button
            aria-label={`Edit ${listing.name}`}
            icon={<EditOutlined />}
            shape="circle"
            type="text"
          />
        </div>

        <div className="mb-5 grid gap-3 text-sm text-slate-600">
          <span className="flex min-w-0 items-center gap-2">
            <TeamOutlined className="text-sky-700" />
            <span>{listing.requestCount} permintaan</span>
          </span>
          <span className="flex min-w-0 items-center gap-2">
            <EnvironmentOutlined className="text-sky-700" />
            <span className="truncate">{listing.location}</span>
          </span>
        </div>

        <Button block icon={<EyeOutlined />} type="primary">
          {actionLabel}
        </Button>
      </div>
    </Card>
  )
}

export function MyListings() {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')
  const [listings] = useState(() =>
    location.state?.createdListing
      ? [location.state.createdListing, ...mockListings]
      : mockListings,
  )

  useEffect(() => {
    if (location.state?.createdListing) {
      navigate(paths.myListings, { replace: true, state: null })
    }
  }, [location.state, navigate])

  const visibleListings = useMemo(() => {
    if (activeFilter === 'all') {
      return listings
    }

    return listings.filter((listing) => listing.status === activeFilter)
  }, [activeFilter, listings])

  return (
    <main className="mx-auto box-border w-full max-w-7xl space-y-6 px-6 py-6 max-md:px-4">
      <section className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="m-0 text-3xl font-bold tracking-normal text-slate-950 max-md:text-2xl">
            Daftar Barang Saya
          </h1>
          <p className="mb-0 mt-2 max-w-2xl text-base leading-7 text-slate-500">
            Kelola barang-barang yang Anda bagikan ke komunitas.
          </p>
        </div>
        <Button
          icon={<PlusOutlined />}
          size="large"
          type="primary"
          onClick={() => navigate(paths.createListing)}
        >
          Tambah Barang Baru
        </Button>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-3">
        <Segmented
          options={filterOptions}
          value={activeFilter}
          onChange={setActiveFilter}
        />
        <p className="m-0 text-sm font-medium text-slate-500">
          {visibleListings.length} barang ditampilkan
        </p>
      </section>

      <section className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
        {visibleListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </section>
    </main>
  )
}
