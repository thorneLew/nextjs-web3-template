import { createSlice } from '@reduxjs/toolkit'
import { mode } from 'src/utils/theme'

interface State {}

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    value: 0,
    themeMode: 'light' as mode,
  },
  reducers: {
    setThemeMode (state, {payload}){
      state.themeMode = payload
    },
  }
})

export const {setThemeMode} = commonSlice.actions
export default commonSlice.reducer