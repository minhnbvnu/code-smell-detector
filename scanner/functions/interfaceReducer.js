function interfaceReducer(state = {nav_class: "default"}, action) {
    switch (action.type) {
        case RESET_NAV_CLASS:
            return {...state, ...action.navbar};
        case SET_NAV_CLASS :
            return {...state, ...action.navbar};
        default:
            return state;
    }
}