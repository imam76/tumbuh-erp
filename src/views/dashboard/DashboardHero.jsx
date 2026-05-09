import { CompassOutlined, UploadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import heroImage from '@/assets/hero1.webp'

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
        <img
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
          src={heroImage}
        />
        <div className="absolute inset-0 bg-linear-to-r from-sky-700 via-sky-700/40 to-transparent" />
        <div className="absolute inset-0 bg-sky-950/10" />
      </div>
    </section>
  )
}
