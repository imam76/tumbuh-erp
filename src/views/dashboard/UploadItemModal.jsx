import { Form, Input, Modal, Select } from 'antd'
import { useEffect, useMemo } from 'react'
import { useI18n } from '@/i18n/useI18n'
import { conditionKeys } from '@/utils/dashboardModules'

export function UploadItemModal({
  categories,
  defaultLocation,
  locations,
  onCancel,
  onSubmit,
  open,
}) {
  const [form] = Form.useForm()
  const { t } = useI18n()
  const conditionOptions = useMemo(
    () =>
      conditionKeys.map((key) => ({
        label: t(`dashboard.conditions.${key}`),
        value: key,
      })),
    [t],
  )

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        conditionKey: conditionKeys[0],
        location: defaultLocation,
      })
    }
  }, [defaultLocation, form, open])

  const handleFinish = (values) => {
    onSubmit(values)
    form.resetFields()
  }

  return (
    <Modal
      cancelText={t('dashboard.actions.cancel')}
      destroyOnHidden
      okText={t('dashboard.actions.upload')}
      open={open}
      title={t('dashboard.modals.uploadTitle')}
      width={560}
      onCancel={onCancel}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={handleFinish}
      >
        <Form.Item
          label={t('dashboard.labels.itemName')}
          name="title"
          rules={[
            {
              required: true,
              message: t('dashboard.validation.itemNameRequired'),
            },
            { min: 3, message: t('dashboard.validation.itemNameMin') },
          ]}
        >
          <Input placeholder={t('dashboard.placeholders.itemName')} />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          <Form.Item
            label={t('dashboard.labels.category')}
            name="categoryKey"
            rules={[
              {
                required: true,
                message: t('dashboard.validation.categoryRequired'),
              },
            ]}
          >
            <Select
              options={categories.map((category) => ({
                label: category.label,
                value: category.key,
              }))}
              placeholder={t('dashboard.placeholders.selectCategory')}
            />
          </Form.Item>

          <Form.Item
            label={t('dashboard.labels.condition')}
            name="conditionKey"
            rules={[
              {
                required: true,
                message: t('dashboard.validation.conditionRequired'),
              },
            ]}
          >
            <Select options={conditionOptions} />
          </Form.Item>
        </div>

        <Form.Item
          label={t('dashboard.labels.pickupLocation')}
          name="location"
          rules={[
            { required: true, message: t('dashboard.validation.locationRequired') },
          ]}
        >
          <Select options={locations.map((value) => ({ label: value, value }))} />
        </Form.Item>

        <Form.Item label={t('dashboard.labels.note')} name="note">
          <Input.TextArea
            autoSize={{ minRows: 3, maxRows: 5 }}
            placeholder={t('dashboard.placeholders.note')}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
