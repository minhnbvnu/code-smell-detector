function optionsReducer(state = cookie.load("spk") ? {stripe_publishable_key : {option : "stripe_publishable_key", "data_type" : "hidden", value : cookie.load("spk")}} : {}, action) {
    switch (action.type) {
        case INITIALIZE :
            return {...state, ...action.initialState.options}
        case SET_OPTIONS :
            return {...state, ...action.options}
        case SET_OPTION :
            return {...state, [action.option.option] : action.option}

        case SET_VERSION :
            return {
                ...state,
                version: action.version
            };
        default:
            return state;
    }
}