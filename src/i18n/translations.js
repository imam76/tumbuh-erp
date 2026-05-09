export const defaultLanguage = 'id'

export const supportedLanguages = [
  { code: 'id', labelKey: 'app.language.indonesian', shortLabel: 'ID' },
  { code: 'en', labelKey: 'app.language.english', shortLabel: 'EN' },
]

export const translations = {
  id: {
    app: {
      searchPlaceholder: 'Cari barang...',
      loadingPage: 'Memuat halaman',
      topNav: {
        browse: 'Jelajahi',
        giveAway: 'Bagikan',
        community: 'Komunitas',
        map: 'Peta',
      },
      actions: {
        notifications: 'Notifikasi',
        messages: 'Pesan',
        settings: 'Pengaturan',
      },
      language: {
        label: 'Bahasa',
        indonesian: 'Indonesia',
        english: 'Inggris',
      },
      menuExtra: {
        title: 'Selamat datang',
        subtitle: 'Siap berbagi hari ini?',
      },
      sidebar: {
        dashboard: 'Dasbor',
        myListings: 'Barang Saya',
        requests: 'Permintaan',
        impactStats: 'Dampak',
        savedItems: 'Tersimpan',
      },
    },
    home: {
      eyebrow: 'AmbilAja',
      title: 'Berbagi barang layak pakai jadi lebih mudah.',
      description:
        'Temukan barang gratis di sekitar komunitasmu, atau unggah barang yang masih layak agar bisa dipakai orang lain.',
      openDashboard: 'Buka Dasbor',
      test404: 'Tes 404',
    },
    notFound: {
      title: 'Halaman tidak ditemukan.',
      subtitle:
        'Rute ini belum tersedia. Kembali ke dasbor untuk melanjutkan.',
      backToDashboard: 'Kembali ke Dasbor',
    },
    placeholder: {
      fallbackSection: 'Halaman',
      title: '{sectionName} sedang disiapkan',
      subtitle:
        'Struktur navigasinya sudah tersedia. Modul ini bisa dikembangkan setelah dasbor utama selesai.',
      backToDashboard: 'Kembali ke Dasbor',
    },
    dashboard: {
      hero: {
        title: 'Barang Layak Pakai, Jangan Sampai Terbuang',
        description:
          'Temukan atau bagikan barang gratis untuk sesama. Bersama kurangi limbah dan bantu komunitas sekitar.',
        primaryAction: 'Unggah Barang',
        secondaryAction: 'Jelajahi Barang',
      },
      sections: {
        communityImpact: 'Dampak Komunitas',
        incomingRequests: 'Permintaan Masuk',
        myActivity: 'Aktivitas Saya',
        popularCategories: 'Kategori Populer',
        nearbyItems: 'Barang Terbaru Sekitarmu',
      },
      actions: {
        showAll: 'Lihat Semua',
        changeLocation: 'Ubah Lokasi',
        clearFilter: 'Reset Filter',
        requestItem: 'Minta Barang',
        myItem: 'Barang Saya',
        approve: 'Setujui',
        reject: 'Tolak',
        upload: 'Unggah',
        cancel: 'Batal',
        save: 'Simpan',
      },
      labels: {
        active: 'Aktif',
        category: 'Kategori',
        condition: 'Kondisi',
        itemName: 'Nama barang',
        myItems: 'Barang Saya',
        myRequests: 'Permintaan Saya',
        note: 'Catatan',
        pickupLocation: 'Lokasi ambil',
        requested: 'Meminta',
        search: 'Pencarian',
        total: 'Total',
      },
      empty: {
        noMatchingItems: 'Tidak ada barang yang cocok',
      },
      modals: {
        uploadTitle: 'Unggah Barang',
        locationTitle: 'Ubah Lokasi',
      },
      placeholders: {
        itemName: 'Contoh: Meja belajar kayu',
        selectCategory: 'Pilih kategori',
        note: 'Tambahkan detail singkat kondisi atau jadwal ambil',
      },
      validation: {
        itemNameRequired: 'Nama barang wajib diisi',
        itemNameMin: 'Nama barang minimal 3 karakter',
        categoryRequired: 'Pilih kategori',
        conditionRequired: 'Pilih kondisi',
        locationRequired: 'Pilih lokasi',
      },
      messages: {
        uploadSuccess: '{title} berhasil diunggah',
        locationChanged: 'Lokasi diubah ke {location}',
        requestSent: 'Permintaan untuk {title} dikirim',
        alreadyInProcess: 'Barang ini sudah masuk proses',
        saved: '{title} disimpan',
        unsaved: '{title} dihapus dari simpanan',
        requestApproved: 'Permintaan {requester} disetujui',
        requestRejected: 'Permintaan {requester} ditolak',
      },
      categories: {
        furniture: 'Furnitur',
        electronics: 'Elektronik',
        books: 'Buku',
        baby: 'Bayi & Anak',
        clothes: 'Pakaian',
        home: 'Rumah Tangga',
      },
      conditions: {
        good: 'Kondisi baik',
        wellMaintained: 'Terawat',
        complete: 'Lengkap',
        needsCleaning: 'Perlu dibersihkan',
      },
      availability: {
        tersedia: 'TERSEDIA',
        proses: 'DIPROSES',
        pending: 'MENUNGGU',
        selesai: 'SELESAI',
      },
      requestActions: {
        process: 'Diproses',
        pending: 'Menunggu',
        completed: 'Selesai',
      },
      requestStatuses: {
        new: 'BARU',
        pending: 'MENUNGGU',
        approved: 'DISETUJUI',
        rejected: 'DITOLAK',
      },
      activityStatuses: {
        process: 'Proses',
        completed: 'Selesai',
        pending: 'Menunggu',
      },
      timeAgo: {
        justNow: 'Baru saja',
        twoHoursAgo: '2 jam yang lalu',
        threeHoursAgo: '3 jam yang lalu',
        fiveHoursAgo: '5 jam yang lalu',
        sixHoursAgo: '6 jam yang lalu',
        oneDayAgo: '1 hari yang lalu',
      },
      data: {
        impact: {
          shared: 'Barang Dibagikan',
          claimed: 'Berhasil Diambil',
          waste: 'Limbah Dicegah',
        },
        impactValues: {
          shared: '1.248',
          claimed: '856',
          waste: '2,4 ton',
        },
        requests: {
          request1Item: 'Rak Buku',
          request1Message:
            'Sangat butuh untuk menaruh buku-buku kuliah saya yang menumpuk.',
          request2Item: 'Stroller Bayi',
          request2Message:
            'Bisa saya ambil sore ini jika barangnya masih tersedia.',
        },
        listings: {
          studyDeskWood: 'Meja Belajar Kayu',
          studyDeskMinimalist: 'Meja Belajar Minimalis',
          officeChair: 'Kursi Kantor Ergonomis',
          bookshelf: 'Rak Buku 4 Tingkat',
          tablewareSet: 'Set Peralatan Makan',
          babyBouncer: 'Bouncer Bayi',
        },
      },
    },
  },
  en: {
    app: {
      searchPlaceholder: 'Search item...',
      loadingPage: 'Loading page',
      topNav: {
        browse: 'Browse',
        giveAway: 'Give Away',
        community: 'Community',
        map: 'Map',
      },
      actions: {
        notifications: 'Notifications',
        messages: 'Messages',
        settings: 'Settings',
      },
      language: {
        label: 'Language',
        indonesian: 'Indonesian',
        english: 'English',
      },
      menuExtra: {
        title: 'Welcome back',
        subtitle: 'Ready to share today?',
      },
      sidebar: {
        dashboard: 'Dashboard',
        myListings: 'My Listings',
        requests: 'Requests',
        impactStats: 'Impact Stats',
        savedItems: 'Saved Items',
      },
    },
    home: {
      eyebrow: 'AmbilAja',
      title: 'Sharing usable items is easier now.',
      description:
        'Find free items around your community, or upload usable items so others can give them a second life.',
      openDashboard: 'Open Dashboard',
      test404: 'Test 404',
    },
    notFound: {
      title: 'Page not found.',
      subtitle:
        'This route is not available yet. Return to the dashboard to continue.',
      backToDashboard: 'Back to Dashboard',
    },
    placeholder: {
      fallbackSection: 'Page',
      title: '{sectionName} is being prepared',
      subtitle:
        'The navigation structure is ready. This module can be developed after the main dashboard is finished.',
      backToDashboard: 'Back to Dashboard',
    },
    dashboard: {
      hero: {
        title: 'Usable Items Should Not Go to Waste',
        description:
          'Find or share free items with others. Together, reduce waste and support the community around you.',
        primaryAction: 'Upload Item',
        secondaryAction: 'Browse Items',
      },
      sections: {
        communityImpact: 'Community Impact',
        incomingRequests: 'Incoming Requests',
        myActivity: 'My Activity',
        popularCategories: 'Popular Categories',
        nearbyItems: 'Latest Items Near You',
      },
      actions: {
        showAll: 'Show All',
        changeLocation: 'Change Location',
        clearFilter: 'Reset Filter',
        requestItem: 'Request Item',
        myItem: 'My Item',
        approve: 'Approve',
        reject: 'Reject',
        upload: 'Upload',
        cancel: 'Cancel',
        save: 'Save',
      },
      labels: {
        active: 'Active',
        category: 'Category',
        condition: 'Condition',
        itemName: 'Item name',
        myItems: 'My Items',
        myRequests: 'My Requests',
        note: 'Note',
        pickupLocation: 'Pickup location',
        requested: 'Requested',
        search: 'Search',
        total: 'Total',
      },
      empty: {
        noMatchingItems: 'No matching items',
      },
      modals: {
        uploadTitle: 'Upload Item',
        locationTitle: 'Change Location',
      },
      placeholders: {
        itemName: 'Example: Wooden study desk',
        selectCategory: 'Select category',
        note: 'Add brief condition details or pickup schedule',
      },
      validation: {
        itemNameRequired: 'Item name is required',
        itemNameMin: 'Item name must be at least 3 characters',
        categoryRequired: 'Select a category',
        conditionRequired: 'Select a condition',
        locationRequired: 'Select a location',
      },
      messages: {
        uploadSuccess: '{title} was uploaded',
        locationChanged: 'Location changed to {location}',
        requestSent: 'Request for {title} was sent',
        alreadyInProcess: 'This item is already in process',
        saved: '{title} saved',
        unsaved: '{title} removed from saved items',
        requestApproved: "{requester}'s request was approved",
        requestRejected: "{requester}'s request was rejected",
      },
      categories: {
        furniture: 'Furniture',
        electronics: 'Electronics',
        books: 'Books',
        baby: 'Baby & Kids',
        clothes: 'Clothing',
        home: 'Household',
      },
      conditions: {
        good: 'Good condition',
        wellMaintained: 'Well maintained',
        complete: 'Complete',
        needsCleaning: 'Needs cleaning',
      },
      availability: {
        tersedia: 'AVAILABLE',
        proses: 'IN PROCESS',
        pending: 'PENDING',
        selesai: 'COMPLETED',
      },
      requestActions: {
        process: 'In Process',
        pending: 'Pending',
        completed: 'Completed',
      },
      requestStatuses: {
        new: 'NEW',
        pending: 'PENDING',
        approved: 'APPROVED',
        rejected: 'REJECTED',
      },
      activityStatuses: {
        process: 'In Process',
        completed: 'Completed',
        pending: 'Pending',
      },
      timeAgo: {
        justNow: 'Just now',
        twoHoursAgo: '2 hours ago',
        threeHoursAgo: '3 hours ago',
        fiveHoursAgo: '5 hours ago',
        sixHoursAgo: '6 hours ago',
        oneDayAgo: '1 day ago',
      },
      data: {
        impact: {
          shared: 'Items Shared',
          claimed: 'Successfully Claimed',
          waste: 'Waste Prevented',
        },
        impactValues: {
          shared: '1,248',
          claimed: '856',
          waste: '2.4 tons',
        },
        requests: {
          request1Item: 'Bookshelf',
          request1Message:
            'I really need it to store my growing pile of college books.',
          request2Item: 'Baby Stroller',
          request2Message:
            'I can pick it up this afternoon if the item is still available.',
        },
        listings: {
          studyDeskWood: 'Wooden Study Desk',
          studyDeskMinimalist: 'Minimalist Study Desk',
          officeChair: 'Ergonomic Office Chair',
          bookshelf: '4-Tier Bookshelf',
          tablewareSet: 'Tableware Set',
          babyBouncer: 'Baby Bouncer',
        },
      },
    },
  },
}
