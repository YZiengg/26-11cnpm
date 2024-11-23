import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    search: '',
}

export const productSlide = createSlice({
    name: 'product',
    initialState,
    reducers: {
        searchProduct: (state, action) => {
            state.search = action.payload; // Cập nhật giá trị state.search
        },
    },
})

// Action creators are generated for each case reducer function
export const { searchProduct } = productSlide.actions

export default productSlide.reducer