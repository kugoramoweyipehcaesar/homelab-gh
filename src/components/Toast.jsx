import { X } from 'lucide-react'

export default function Toast({ message, type = 'success', onClose }) {
  const bg = type === 'error' ? 'bg-red-500' : 'bg-green-500'
  return (
    <div className={`fixed bottom-6 right-6 ${bg} text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50`}>
      <span>{message}</span>
      <button onClick={onClose}><X size={16} /></button>
    </div>
  )
}