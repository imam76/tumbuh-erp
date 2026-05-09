import { Button, Result } from 'antd'
import { useNavigate } from 'react-router'
import { paths } from '@/routes/paths'

export function NotFoundView() {
  const navigate = useNavigate()

  return (
    <section className="mx-auto box-border grid min-h-[calc(100svh-82px)] w-full max-w-5xl content-center px-8 py-20 max-[720px]:min-h-[calc(100svh-122px)] max-[720px]:px-5 max-[720px]:py-14">
      <Result
        status="404"
        title="Halaman tidak ditemukan."
        subTitle="Route ini belum tersedia. Kembali ke dashboard untuk melanjutkan."
        extra={
          <Button type="primary" onClick={() => navigate(paths.dashboard)}>
            Kembali ke Dashboard
          </Button>
        }
      />
    </section>
  )
}
