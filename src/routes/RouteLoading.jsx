import { Spin } from 'antd'

export function RouteLoading() {
  return (
    <section className="grid min-h-[calc(100svh-82px)] place-items-center px-8 py-20 max-[720px]:min-h-[calc(100svh-122px)] max-[720px]:px-5">
      <Spin size="large" description="Memuat halaman" />
    </section>
  )
}
