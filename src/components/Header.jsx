import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User } from 'lucide-react'

export default function Header({ cartCount }) {
  const navigate = useNavigate()
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
  const isAdmin = localStorage.getItem('isAdmin') === 'true'

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">HL</span>
          </div>
          <div>
            <span className="font-bold text-dark text-lg">HomeLab GH</span>
            <p className="text-xs text-gray-500 -mt-1">lab service</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-primary">Home</Link>
          <Link to="/tests" className="hover:text-primary">Tests</Link>
          <Link to="/book-test" className="hover:text-primary">Book Appointment</Link>
          {currentUser && <Link to="/dashboard" className="hover:text-primary">Dashboard</Link>}
          {currentUser && <Link to="/my-results" className="hover:text-primary">My Results</Link>}
          {isAdmin && <Link to="/admin" className="hover:text-primary">Admin</Link>}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/tests')}
            className="relative p-2 rounded-full hover:bg-gray-100"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {currentUser ? (
            <button
              onClick={() => {
                localStorage.removeItem('currentUser')
                localStorage.removeItem('isAdmin')
                navigate('/login')
              }}
              className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary"
            >
              <User size={18} />
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  )
}