import { Button, Empty, Tag } from 'antd'
import { useI18n } from '@/i18n/useI18n'
import { ItemListingCard } from '@/views/dashboard/ItemListingCard'

export function NearbyItemsSection({
  hasActiveFilters,
  listings,
  location,
  searchTerm,
  sectionRef,
  selectedCategoryLabel,
  onChangeLocation,
  onClearFilters,
  onRequestItem,
  onToggleSave,
}) {
  const { t } = useI18n()

  return (
    <section ref={sectionRef}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="m-0 text-2xl font-bold text-slate-950">
          {t('dashboard.sections.nearbyItems')}
        </h2>
        <div className="flex flex-wrap items-center justify-end gap-2">
          {selectedCategoryLabel ? (
            <Tag color="green">{selectedCategoryLabel}</Tag>
          ) : null}
          {searchTerm ? (
            <Tag className="max-w-[240px] truncate" color="purple">
              {t('dashboard.labels.search')}: {searchTerm}
            </Tag>
          ) : null}
          <Tag color="blue">{location}</Tag>
          <Button size="small" type="text" onClick={onChangeLocation}>
            {t('dashboard.actions.changeLocation')}
          </Button>
        </div>
      </div>
      {listings.length > 0 ? (
        <div className="grid grid-cols-3 gap-6 max-xl:grid-cols-2 max-md:grid-cols-1">
          {listings.map((item) => (
            <ItemListingCard
              item={item}
              key={item.id}
              onRequestItem={onRequestItem}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-slate-200 bg-white py-12">
          <Empty description={t('dashboard.empty.noMatchingItems')}>
            {hasActiveFilters ? (
              <Button type="primary" onClick={onClearFilters}>
                {t('dashboard.actions.clearFilter')}
              </Button>
            ) : null}
          </Empty>
        </div>
      )}
    </section>
  )
}
