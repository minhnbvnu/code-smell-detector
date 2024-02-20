function systemNotificationReducer(state = [], action) {
    switch (action.type) {
        case INITIALIZE :
            return action.initialState.system_notifications
        case ADD_SYSTEM_NOTIFICATION :
            return [...state, action.notification];
        case SET_SYSTEM_NOTIFICATIONS :
            return action.notifications;
        case SET_SYSTEM_NOTIFICATION :
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