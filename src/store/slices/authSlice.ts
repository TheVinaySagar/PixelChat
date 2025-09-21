import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { authAPI } from '../../lib/api'

interface User {
  id: string
  email: string
  credits: number
  createdAt?: string
  lastLogin?: string
}

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  credits: number
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  credits: 100, // Default credits
}

// Async thunks for authentication
export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authAPI.signIn(email, password)
      
      // Store token and user data
      localStorage.setItem('authToken', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      
      return response.user
    } catch (error: any) {
      const message = error.response?.data?.error || error.message || 'Sign in failed'
      return rejectWithValue(message)
    }
  }
)

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authAPI.signUp(email, password)
      
      // Store token and user data
      localStorage.setItem('authToken', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      
      return response.user
    } catch (error: any) {
      const message = error.response?.data?.error || error.message || 'Sign up failed'
      return rejectWithValue(message)
    }
  }
)

export const signOut = createAsyncThunk('auth/signOut', async (_, { rejectWithValue }) => {
  try {
    await authAPI.signOut()
    
    // Remove token and user data
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    
    return null
  } catch (error: any) {
    const message = error.response?.data?.error || error.message || 'Sign out failed'
    return rejectWithValue(message)
  }
})

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('authToken')
    if (!token) {
      return null
    }
    
    const response = await authAPI.getCurrentUser()
    return response.user
  } catch (error: any) {
    // Clear invalid token
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    return null
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
    updateCredits: (state, action: PayloadAction<number>) => {
      state.credits = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.credits = action.payload?.credits || 100
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string || 'Sign in failed'
      })
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.credits = action.payload?.credits || 100
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string || 'Sign up failed'
      })
      // Sign Out
      .addCase(signOut.fulfilled, (state) => {
        state.user = null
        state.credits = 100
      })
      // Get Current User
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.credits = action.payload?.credits || 100
      })
  },
})

export const { clearError, setUser, updateCredits } = authSlice.actions
export default authSlice.reducer