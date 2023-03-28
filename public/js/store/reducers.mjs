import * as fromActions from './actions.mjs';


const initialState = {
    searchTerm: undefined,
    location: undefined,
    icon: '',
    forecast: undefined,
    loaded: false,
    loading: false
}


export const reducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case fromActions.GET_WEATHER_DATA:
            const payLoad = action.payLoad;

            return {
                ...state,
                ...payLoad,
                loading: true,
                loaded: false,
            }

        case fromActions.GET_WEATHER_DATA_SUCCESS:
            const successPayLoad = action.payLoad;

            return {
                ...state,
                ...successPayLoad,
                loaded: true,
                loading: false
            }

        case fromActions.GET_WEATHER_DATA_FAIL:
            const errorPayLoad = action.payLoad;

            return {
                ...state,
                ...errorPayLoad,
                loaded: true,
                loading: false
            }
    
        default:
            return state;
    }
}