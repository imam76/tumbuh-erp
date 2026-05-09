import {
  CameraOutlined,
  CheckCircleFilled,
  EnvironmentOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Select, Upload } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'

const conditionOptions = [
  { label: 'Baru', value: 'good' },
  { label: 'Like New', value: 'wellMaintained' },
  { label: 'Layak Pakai', value: 'complete' },
]

const pickupMethods = [
  {
    label: 'Janjian di tempat umum',
    note: 'Taman, Stasiun, Mall, dll',
    value: 'publicPlace',
  },
  {
    label: 'Ambil di rumah',
    note: 'Penerima datang ke lokasi Anda',
    value: 'homePickup',
  },
  {
    label: 'Kurir (Ongkir ditanggung)',
    note: 'Gojek, Grab, JNE, dll',
    value: 'courier',
  },
]

const defaultValues = {
  categoryKey: undefined,
  conditionKey: 'good',
  description: '',
  isFreeAgreement: true,
  location: '',
  photos: [],
  pickupMethods: ['publicPlace'],
  title: '',
}

function getUploadName(file) {
  return file?.name || file?.originFileObj?.name || 'Foto barang'
}

function PhotoSlot({ file, isPrimary }) {
  if (file) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-3 text-center">
        <CheckCircleFilled className="text-2xl text-sky-700" />
        <span className="line-clamp-2 text-xs font-semibold text-slate-700">
          {getUploadName(file)}
        </span>
      </div>
    )
  }

  if (isPrimary) {
    return (
      <div className="grid place-items-center">
        <div className="grid h-28 w-24 place-items-center rounded-md bg-white/80 text-center shadow-sm">
          <div>
            <CameraOutlined className="text-3xl text-sky-700" />
            <p className="m-0 mt-2 text-sm font-semibold text-sky-700">
              Foto Utama
            </p>
            <p className="m-0 text-[11px] text-slate-500">
              Drag & drop atau klik
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid h-full place-items-center text-slate-500">
      <PlusOutlined className="text-xl" />
    </div>
  )
}

function PhotoPicker({ fileList, onChange }) {
  const normalizedFileList = Array.isArray(fileList) ? fileList : []
  const slots = Array.from({ length: 7 }, (_, index) => normalizedFileList[index])

  return (
    <Upload
      accept="image/*"
      beforeUpload={() => false}
      fileList={normalizedFileList}
      maxCount={7}
      multiple
      showUploadList={false}
      onChange={({ fileList: nextFileList }) => onChange(nextFileList.slice(0, 7))}
    >
      <div className="grid cursor-pointer grid-cols-[minmax(220px,1.2fr)_repeat(3,minmax(96px,0.58fr))] gap-3 max-lg:grid-cols-2">
        {slots.map((file, index) => (
          <div
            className={`rounded-lg border border-dashed border-sky-300 bg-sky-50/60 ${
              index === 0
                ? 'min-h-56 max-lg:col-span-2'
                : 'min-h-28 bg-slate-50'
            }`}
            key={`photo-slot-${index}`}
          >
            <PhotoSlot file={file} isPrimary={index === 0} />
          </div>
        ))}
      </div>
    </Upload>
  )
}

function PickupMethodOption({ checked, method, onChange }) {
  return (
    <label
      className={`flex min-h-16 cursor-pointer items-start gap-3 rounded-lg border px-3 py-3 transition ${
        checked
          ? 'border-sky-700 bg-sky-50 text-slate-950'
          : 'border-slate-200 bg-white text-slate-700'
      }`}
    >
      <Checkbox checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span className="min-w-0">
        <span className="block text-sm font-semibold leading-tight">
          {method.label}
        </span>
        <span className="mt-1 block text-[11px] leading-tight text-slate-500">
          {method.note}
        </span>
      </span>
    </label>
  )
}

function ConditionPicker({ value, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {conditionOptions.map((condition) => (
        <button
          className={`h-10 rounded-lg border bg-white px-3 text-sm font-medium transition ${
            value === condition.value
              ? 'border-sky-700 bg-sky-50 text-sky-700 shadow-[0_0_0_1px_#0369a1]'
              : 'border-slate-200 text-slate-600'
          }`}
          key={condition.value}
          type="button"
          onClick={() => onChange(condition.value)}
        >
          {condition.label}
        </button>
      ))}
    </div>
  )
}

export function UploadItemForm({
  categories,
  defaultLocation,
  locations,
  onCancel,
  onSubmit,
}) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues,
    mode: 'onBlur',
  })

  useEffect(() => {
    reset({
      ...defaultValues,
      location: defaultLocation || '',
    })
  }, [defaultLocation, reset])

  const submitForm = (intent) =>
    handleSubmit((values) => {
      onSubmit({ ...values, intent })
    })()

  return (
    <Form className="space-y-6" layout="vertical" requiredMark={false}>
      <section>
        <h2 className="m-0 text-base font-bold text-slate-950">Foto Barang</h2>
        <p className="mb-4 mt-2 text-sm text-slate-500">
          Ambil foto dari berbagai sisi (depan, samping, detail) agar penerima
          lebih yakin.
        </p>
        <Controller
          control={control}
          name="photos"
          render={({ field }) => (
            <PhotoPicker fileList={field.value} onChange={field.onChange} />
          )}
        />
      </section>

      <div className="border-t border-slate-100" />

      <Controller
        control={control}
        name="title"
        rules={{
          minLength: {
            message: 'Nama barang minimal 3 karakter',
            value: 3,
          },
          required: 'Nama barang wajib diisi',
        }}
        render={({ field }) => (
          <Form.Item
            help={errors.title?.message}
            label="Nama Barang"
            validateStatus={errors.title ? 'error' : undefined}
          >
            <Input {...field} placeholder="Contoh: Meja Belajar Kayu Minimalis" />
          </Form.Item>
        )}
      />

      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <Controller
          control={control}
          name="categoryKey"
          rules={{ required: 'Pilih kategori barang' }}
          render={({ field }) => (
            <Form.Item
              help={errors.categoryKey?.message}
              label="Kategori"
              validateStatus={errors.categoryKey ? 'error' : undefined}
            >
              <Select
                {...field}
                options={categories.map((category) => ({
                  label: category.label,
                  value: category.key,
                }))}
                placeholder="Pilih Kategori"
              />
            </Form.Item>
          )}
        />

        <Controller
          control={control}
          name="conditionKey"
          rules={{ required: 'Pilih kondisi barang' }}
          render={({ field }) => (
            <Form.Item
              help={errors.conditionKey?.message}
              label="Kondisi"
              validateStatus={errors.conditionKey ? 'error' : undefined}
            >
              <ConditionPicker value={field.value} onChange={field.onChange} />
            </Form.Item>
          )}
        />
      </div>

      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <Form.Item label="Deskripsi Barang">
            <Input.TextArea
              {...field}
              className="min-h-28"
              placeholder="Ceritakan detail barang Anda. Mengapa Anda memberikan ini? Apakah ada minus atau catatan khusus?"
            />
          </Form.Item>
        )}
      />

      <div className="border-t border-slate-100" />

      <Controller
        control={control}
        name="location"
        rules={{ required: 'Lokasi penjemputan wajib diisi' }}
        render={({ field }) => (
          <Form.Item
            help={errors.location?.message}
            label="Lokasi Penjemputan"
            validateStatus={errors.location ? 'error' : undefined}
          >
            <Input
              {...field}
              list="pickup-location-options"
              placeholder="Masukkan alamat lengkap atau titik temu..."
              prefix={<EnvironmentOutlined className="text-sky-700" />}
            />
            <datalist id="pickup-location-options">
              {locations.map((location) => (
                <option key={location} value={location} />
              ))}
            </datalist>
          </Form.Item>
        )}
      />

      <Controller
        control={control}
        name="pickupMethods"
        rules={{
          validate: (value) =>
            value.length > 0 || 'Pilih minimal satu metode pengambilan',
        }}
        render={({ field }) => (
          <Form.Item
            help={errors.pickupMethods?.message}
            label="Metode Pengambilan"
            validateStatus={errors.pickupMethods ? 'error' : undefined}
          >
            <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
              {pickupMethods.map((method) => {
                const checked = field.value.includes(method.value)

                return (
                  <PickupMethodOption
                    checked={checked}
                    key={method.value}
                    method={method}
                    onChange={(isChecked) => {
                      const nextValue = isChecked
                        ? [...field.value, method.value]
                        : field.value.filter((value) => value !== method.value)

                      field.onChange(nextValue)
                    }}
                  />
                )
              })}
            </div>
          </Form.Item>
        )}
      />

      <Controller
        control={control}
        name="isFreeAgreement"
        rules={{
          validate: (value) =>
            value ||
            'Anda perlu menyetujui bahwa barang dibagikan secara gratis',
        }}
        render={({ field }) => (
          <Form.Item
            help={errors.isFreeAgreement?.message}
            validateStatus={errors.isFreeAgreement ? 'error' : undefined}
          >
            <label className="flex cursor-pointer items-start gap-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
              <Checkbox
                checked={field.value}
                className="mt-0.5"
                onChange={(event) => field.onChange(event.target.checked)}
              />
              <span>
                <span className="block text-sm font-bold">
                  Saya bersedia memberikan barang ini secara gratis kepada yang
                  membutuhkan.
                </span>
                <span className="mt-2 block text-sm leading-6">
                  Dengan mencentang ini, Anda setuju untuk mengikuti semangat
                  komunitas AmbilAja yang mengutamakan keikhlasan dan tolong
                  menolong.
                </span>
              </span>
            </label>
          </Form.Item>
        )}
      />

      <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
        <Button type="text" onClick={onCancel}>
          Batal
        </Button>
        <Button onClick={() => submitForm('draft')}>Simpan Draft</Button>
        <Button type="primary" onClick={() => submitForm('publish')}>
          Bagikan Sekarang
        </Button>
      </div>
    </Form>
  )
}
