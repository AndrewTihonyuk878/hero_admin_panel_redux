const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    activeFilter: "all",
    filteredHeroes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETED':

            const newHeroList = state.heroes.filter(item => item.id != action.payload)

            return {
                ...state,
                heroes: newHeroList
            }
        case 'HERO_CREATED':
            let newCreatedHeroList = [...state.heroes, action.payload] 
            return {
                ...state,
                heroes: newCreatedHeroList
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes: action.payload === 'all' ?
                                state.heroes : 
                                state.heroes.filter(item => item.element === action.payload)    
            }             
        default: return state
    }
}

export default reducer;