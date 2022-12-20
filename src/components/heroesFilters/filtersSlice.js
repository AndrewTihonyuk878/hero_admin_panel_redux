import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    filters: [],
    filterLoadingStatus: 'idle',
    activeFilter: "all"
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetching: state => {
            state.filterLoadingStatus = 'loading'
        },
        filtersFetched: (state, action) => {
            state.filters = action.payload
            state.filterLoadingStatus = 'idle'
        },
        filtersFetchingError: state => {
            state.filterLoadingStatus = 'error'
        },
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload
        }
    }
})

const {actions, reducer} = filtersSlice

export default reducer

export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged
} = actions