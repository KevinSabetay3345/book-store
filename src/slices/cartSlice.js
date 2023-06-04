import { createSlice } from '@reduxjs/toolkit'

function getTotalPrice(items) {
  const priceXquantity = (item) => (item.quantity * item.price)
  const sumPrice = (cont, item) => cont + item
  return items.map(priceXquantity).reduce(sumPrice, 0).toFixed(2)
}
const initialState = {
  items: [],
  totalPrice: "0.00"
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push({...action.payload, quantity: "1"})
      state.totalPrice  = getTotalPrice(state.items)
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      
      if (state.items.length === 0) {
        state.totalPrice  = "0.00"
      } else {
        state.totalPrice  = getTotalPrice(state.items)
      }
    },
    changeQuantity: (state, action) => {
      state.items = state.items.map(item => (item.id === action.payload.id) ?
        { ...item, quantity: action.payload.quantity } : item
      )
      state.totalPrice  = getTotalPrice(state.items)
    },
  }
})

export const { addItem, removeItem, changeQuantity } = cartSlice.actions

export default cartSlice.reducer