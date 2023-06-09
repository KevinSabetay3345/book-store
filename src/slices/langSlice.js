import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lang: "ES",
}

export const langSlice = createSlice({
  name: 'langs',
  initialState,
  reducers: {
    changeLang: (state, action) => {
      state.lang = action.payload
    },
  }
})

export const { changeLang } = langSlice.actions

export default langSlice.reducer