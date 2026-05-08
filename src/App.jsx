import { Link, NavLink, Navigate, Route, Routes } from 'react-router'
import './App.css'

const modules = [
  { label: 'Sales', value: '24 order', trend: '+12%' },
  { label: 'Inventory', value: '1.248 item', trend: '98%' },
  { label: 'Finance', value: 'Rp 86,4 jt', trend: '+8%' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/">
          Tumbuh ERP
        </Link>
        <nav className="main-nav" aria-label="Primary navigation">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}

function HomePage() {
  return (
    <section className="page-section hero-section">
      <p className="eyebrow">React Router v7 siap dipakai</p>
      <h1>Bangun alur ERP dari route yang jelas.</h1>
      <p className="lead">
        Struktur dasar routing sudah aktif untuk halaman publik, dashboard, dan
        fallback 404. Kamu bisa lanjut menambah module route sesuai kebutuhan
        Tumbuh ERP.
      </p>
      <div className="actions">
        <Link className="primary-action" to="/dashboard">
          Buka Dashboard
        </Link>
        <Link className="secondary-action" to="/missing-page">
          Tes 404
        </Link>
      </div>
    </section>
  )
}

function DashboardPage() {
  return (
    <section className="page-section dashboard-section">
      <div className="section-heading">
        <p className="eyebrow">Dashboard</p>
        <h1>Ringkasan operasi hari ini</h1>
      </div>
      <div className="metric-grid">
        {modules.map((module) => (
          <article className="metric-card" key={module.label}>
            <span>{module.label}</span>
            <strong>{module.value}</strong>
            <small>{module.trend}</small>
          </article>
        ))}
      </div>
    </section>
  )
}

function NotFoundPage() {
  return (
    <section className="page-section not-found-section">
      <p className="eyebrow">404</p>
      <h1>Halaman tidak ditemukan.</h1>
      <p className="lead">
        Route ini belum tersedia. Kembali ke halaman utama untuk melanjutkan.
      </p>
      <Link className="primary-action" to="/">
        Kembali ke Home
      </Link>
    </section>
  )
}

export default App
