import { Form, Input, Modal, Select } from 'antd'
import { useEffect } from 'react'

const conditionOptions = [
  { label: 'Kondisi baik', value: 'Kondisi baik' },
  { label: 'Terawat', value: 'Terawat' },
  { label: 'Lengkap', value: 'Lengkap' },
  { label: 'Perlu dibersihkan', value: 'Perlu dibersihkan' },
]

export function UploadItemModal({
  categories,
  defaultLocation,
  locations,
  onCancel,
  onSubmit,
  open,
}) {
  const [form] = Form.useForm()

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        condition: conditionOptions[0].value,
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
      cancelText="Batal"
      destroyOnHidden
      okText="Upload"
      open={open}
      title="Upload Barang"
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
          label="Nama barang"
          name="title"
          rules={[
            { required: true, message: 'Nama barang wajib diisi' },
            { min: 3, message: 'Nama barang minimal 3 karakter' },
          ]}
        >
          <Input placeholder="Contoh: Meja belajar kayu" />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          <Form.Item
            label="Kategori"
            name="category"
            rules={[{ required: true, message: 'Pilih kategori' }]}
          >
            <Select
              options={categories.map((category) => ({
                label: category.label,
                value: category.label,
              }))}
              placeholder="Pilih kategori"
            />
          </Form.Item>

          <Form.Item
            label="Kondisi"
            name="condition"
            rules={[{ required: true, message: 'Pilih kondisi' }]}
          >
            <Select options={conditionOptions} />
          </Form.Item>
        </div>

        <Form.Item
          label="Lokasi ambil"
          name="location"
          rules={[{ required: true, message: 'Pilih lokasi' }]}
        >
          <Select options={locations.map((value) => ({ label: value, value }))} />
        </Form.Item>

        <Form.Item label="Catatan" name="note">
          <Input.TextArea
            autoSize={{ minRows: 3, maxRows: 5 }}
            placeholder="Tambahkan detail singkat kondisi atau jadwal ambil"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
