import { createContext, useCallback, useContext, useState } from 'react'

const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [preset, setPreset] = useState({})

  // preset can carry { serviceId, carModel, date } from quick-book widgets
  const openBooking = useCallback((initial = {}) => {
    setPreset(initial)
    setOpen(true)
  }, [])

  const closeBooking = useCallback(() => setOpen(false), [])

  return (
    <BookingContext.Provider value={{ open, preset, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = () => useContext(BookingContext)
