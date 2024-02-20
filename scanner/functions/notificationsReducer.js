function notificationsReducer(state = [], action) {
    switch (action.type) {
        case INITIALIZE :
            return action.initialState.notifications
        case ADD_NOTIFICATION :
            return [...state, action.notification];
        case SET_NOTIFICATIONS :
            return action.notifications;
        case SET_NOTIFICATION :
            return (state.map(notification => {
                if (notification.id == action.notification.id) {
                    return action.notification
                } else {
                    return notification;
                }
            }));
        default:
            return state;
    }
}