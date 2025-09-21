import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCurrentUser, setUser } from '../store/slices/authSlice'
import { AppDispatch } from '../store'

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    // Check for existing auth token and user data
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData)
        dispatch(setUser(user))
        
        // Verify token is still valid by fetching current user
        dispatch(getCurrentUser())
      } catch (error) {
        // Invalid stored data, clear it
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
      }
    }
  }, [dispatch])
}