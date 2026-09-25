import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Toast from './components/Toast'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Tests from './pages/Tests'
import Dashboard from './pages/Dashboard'
import MyResults from './pages/MyResults'
import BookTest from './pages/BookTest'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Admin from './pages/Admin'

function App() {
  const [cartCount, setCartCount] = useState(0)
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartCount(cart.length)

    if (!localStorage.getItem('testPrices')) {
      localStorage.setItem('testPrices', JSON.stringify({
        'Full Blood Count': 120,
        'Malaria Test': 45,
        'Liver Function Test (LFT)': 150,
        'Kidney Function Test (KFT)': 130,
        'Diabetes Panel': 200,
        'CBC': 50,
        'Lipid Panel': 80,
        'COVID-19 PCR': 120,
        'HbA1c': 60
      }))
    }
  }, [])

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartCount(cart.length)
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header cartCount={cartCount} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home showToast={showToast} />} />
            <Route path="/tests" element={<Tests showToast={showToast} updateCartCount={updateCartCount} />} />
            <Route path="/book-test" element={<BookTest showToast={showToast} updateCartCount={updateCartCount} />} />
            <Route path="/login" element={<Login showToast={showToast} />} />
            <Route path="/signup" element={<Signup showToast={showToast} />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard showToast={showToast} />
              </ProtectedRoute>
            } />
            <Route path="/my-results" element={
              <ProtectedRoute>
                <MyResults showToast={showToast} />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={<Admin showToast={showToast} />} />
          </Routes>
        </main>
        <Footer />
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </BrowserRouter>
  )
}

export default App