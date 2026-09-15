import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: { email: string; name: string; surname: string } | null;
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
}

const storedToken = localStorage.getItem('auth_token');
const storedUserString = localStorage.getItem('auth_user');
const storedUser = storedUserString ? JSON.parse(storedUserString) : null;

const initialState: AuthState = {
  user: storedUser,
  token: storedToken,
  isAuthenticated: !!storedToken, 
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: any; token: string }>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.error = null;

      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, logout, setError } = authSlice.actions;
export default authSlice.reducer;


