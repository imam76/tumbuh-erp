import { CompassOutlined, UploadOutlined } from '@ant-design/icons'
import { Button } from 'antd'

export function DashboardHero({ hero, onBrowseItems, onUploadItem }) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-sky-700 px-8 py-9 text-white shadow-sm max-md:px-5">
      <div className="relative z-10 max-w-2xl">
        <h1 className="mb-4 max-w-xl text-3xl font-bold leading-tight max-md:text-2xl">
          {hero.title}
        </h1>
        <p className="mb-7 max-w-2xl text-base leading-7 text-sky-50">
          {hero.description}
        </p>
        <div className="flex flex-wrap gap-4">
          <Button
            icon={<UploadOutlined />}
            size="large"
            style={{
              backgroundColor: '#72f29a',
              borderColor: '#72f29a',
              color: '#075985',
              fontWeight: 700,
            }}
            type="primary"
            onClick={onUploadItem}
          >
            {hero.primaryAction}
          </Button>
          <Button
            ghost
            icon={<CompassOutlined />}
            size="large"
            style={{ fontWeight: 700 }}
            onClick={onBrowseItems}
          >
            {hero.secondaryAction}
          </Button>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] overflow-hidden lg:block">
        <div className="absolute inset-0 bg-sky-500/20" />
        <div className="absolute right-8 top-8 h-40 w-56 rotate-6 rounded-2xl bg-white/15 shadow-2xl backdrop-blur-sm" />
        <div className="absolute right-24 top-20 h-40 w-64 -rotate-6 rounded-2xl bg-white/20 shadow-2xl backdrop-blur-sm" />
        <div className="absolute bottom-8 right-16 h-16 w-52 rounded-full bg-slate-950/20 blur-xl" />
      </div>
    </section>
  )
}
