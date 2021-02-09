const initialState = {
    bookList: [],
    error: [],
    isLoaded: false
}

export function BookReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_BOOKS":
            return {...state, bookList: action.payload.books };

        case "IS_LOADED":
            return {...state, isLoaded: action.payload.loaded };

        case "ERROR":
            return {...state, error: action.payload.error };    
        
        case "CLEAR_ERROR":
            return {...state, error: [] };    
                
        default:
            return state;
    }
}

