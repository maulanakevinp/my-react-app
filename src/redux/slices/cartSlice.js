import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		data: JSON.parse(localStorage.getItem("cart")) || []
	},
	reducers: {
		addToCart: (state, action) => {
			const itemOnCart = state.data.find(item => item.id === action.payload.id);
			if (itemOnCart) {
				itemOnCart.qty += 1;
			} else {
				state.data.push({id: action.payload.id, qty:1});
			}
		},
		decreaseQuantity: (state, action) => {
			const itemOnCart = state.data.find(item => item.id === action.payload.id);
			if (itemOnCart.qty > 1) {
				itemOnCart.qty -= 1;
			} else {
				state.data = state.data.filter(item => item.id !== action.payload.id);
			}
		},
	},
});

export const { addToCart, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;