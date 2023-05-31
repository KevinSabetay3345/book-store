import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push({...action.payload, quantity: "1"})
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    changeQuantity: (state, action) => {
      state.items = state.items.map(item => (item.id === action.payload.id) ?
        { ...item, quantity: action.payload.quantity } : item
      )
    },
  }
})

export const { addItem, removeItem, changeQuantity } = cartSlice.actions

export default cartSlice.reducer