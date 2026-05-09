import { Button, Result } from 'antd'
import { useLocation, useNavigate } from 'react-router'
import { paths } from '@/routes/paths'
import { findSideNavigationItem } from '@/utils/sideNavigationItems'

export function SectionPlaceholderView() {
  const location = useLocation()
  const navigate = useNavigate()
  const currentItem = findSideNavigationItem(location.pathname)
  const sectionName = currentItem?.label || 'Halaman'

  return (
    <section className="mx-auto box-border grid min-h-[calc(100svh-82px)] w-full max-w-4xl content-center px-8 py-20 max-md:px-5">
      <Result
        status="info"
        title={`${sectionName} sedang disiapkan`}
        subTitle="Struktur navigasinya sudah tersedia. Modul ini bisa dikembangkan setelah dashboard utama selesai."
        extra={
          <Button type="primary" onClick={() => navigate(paths.dashboard)}>
            Kembali ke Dashboard
          </Button>
        }
      />
    </section>
  )
}
