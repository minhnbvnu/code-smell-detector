function alertsReducer(state = [], action) {
    switch (action.type) {
        case INITIALIZE :
            return action.initialState.alerts;
        case DISMISS_ALERT:
            return action.alerts;
        case ADD_ALERT:
            return [...state, action.alert];
        default:
            return state;
    }
}