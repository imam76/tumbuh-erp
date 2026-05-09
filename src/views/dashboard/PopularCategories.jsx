import {
  BookOutlined,
  HomeOutlined,
  LaptopOutlined,
  RightOutlined,
  ShopOutlined,
  SkinOutlined,
  SmileOutlined,
} from '@ant-design/icons'
import { useI18n } from '@/i18n/useI18n'

const iconMap = {
  furniture: <ShopOutlined />,
  electronics: <LaptopOutlined />,
  books: <BookOutlined />,
  baby: <SmileOutlined />,
  clothes: <SkinOutlined />,
  home: <HomeOutlined />,
}

const toneClassMap = {
  amber: 'bg-amber-100 text-amber-700',
  blue: 'bg-sky-100 text-sky-700',
  green: 'bg-emerald-100 text-emerald-700',
  rose: 'bg-rose-100 text-rose-700',
  slate: 'bg-slate-200 text-slate-700',
  sky: 'bg-sky-100 text-sky-700',
}

export function PopularCategories({
  activeCategoryKey,
  categories,
  onSelectCategory,
  onShowAll,
}) {
  const { t } = useI18n()

  return (
    <section>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="m-0 text-2xl font-bold text-slate-950">
          {t('dashboard.sections.popularCategories')}
        </h2>
        <button
          className="border-0 bg-transparent text-sm font-bold text-sky-700"
          type="button"
          onClick={onShowAll}
        >
          {t('dashboard.actions.showAll')}
        </button>
      </div>
      <div className="grid grid-cols-6 gap-4 max-xl:grid-cols-3 max-md:grid-cols-2">
        {categories.map((category) => (
          <button
            aria-pressed={activeCategoryKey === category.key}
            className={`min-h-24 rounded-xl border px-4 py-4 text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md ${
              activeCategoryKey === category.key
                ? 'border-sky-400 bg-sky-50'
                : 'border-slate-200 bg-white'
            }`}
            key={category.key}
            type="button"
            onClick={() => onSelectCategory(category.key)}
          >
            <span
              className={`mx-auto mb-3 grid size-11 place-items-center rounded-lg text-xl ${
                toneClassMap[category.tone]
              }`}
            >
              {iconMap[category.icon]}
            </span>
            <span className="block text-sm font-semibold">{category.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-3 text-slate-400">
        <RightOutlined className="rotate-180" />
        <div className="h-1 flex-1 rounded-full bg-slate-200">
          <div className="h-full w-36 rounded-full bg-slate-400" />
        </div>
        <RightOutlined />
      </div>
    </section>
  )
}
