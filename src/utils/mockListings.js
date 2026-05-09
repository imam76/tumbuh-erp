export const listingStatuses = {
  available: 'Tersedia',
  processing: 'Sedang Diproses',
  completed: 'Sudah Diambil',
}

export const mockListings = [
  {
    id: 'listing-study-desk',
    name: 'Meja Belajar Kayu',
    status: listingStatuses.available,
    postedAt: '2 jam yang lalu',
    requestCount: 4,
    location: 'Kemang, Jakarta Selatan',
    imageUrl:
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'listing-bookshelf',
    name: 'Rak Buku 4 Tingkat',
    status: listingStatuses.processing,
    postedAt: '5 jam yang lalu',
    requestCount: 8,
    location: 'Pondok Indah, Jakarta Selatan',
    imageUrl:
      'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'listing-baby-stroller',
    name: 'Stroller Bayi Lipat',
    status: listingStatuses.completed,
    postedAt: '1 hari yang lalu',
    requestCount: 6,
    location: 'Bintaro, Tangerang Selatan',
    imageUrl:
      'https://images.unsplash.com/photo-1598890777032-bde835ba27c4?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'listing-dining-set',
    name: 'Set Piring Keramik',
    status: listingStatuses.available,
    postedAt: '2 hari yang lalu',
    requestCount: 3,
    location: 'Cipete, Jakarta Selatan',
    imageUrl:
      'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'listing-monitor',
    name: 'Monitor LED 22 Inci',
    status: listingStatuses.processing,
    postedAt: '3 hari yang lalu',
    requestCount: 11,
    location: 'Kuningan, Jakarta Selatan',
    imageUrl:
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'listing-storage-box',
    name: 'Kotak Penyimpanan Plastik',
    status: listingStatuses.completed,
    postedAt: '4 hari yang lalu',
    requestCount: 2,
    location: 'Mampang, Jakarta Selatan',
    imageUrl:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80',
  },
]
