function uidReducer(state = cookie.load("uid") || null, action) {
    switch (action.type) {
        case INITIALIZE :
            if (action.initialState.uid == undefined) {
                return null;
            } else {
                DELETETHISCODELATERUID = action.initialState.uid;
                return action.initialState.uid;
            }
        case SET_UID :
            DELETETHISCODELATERUID = action.uid;
            return action.uid;
        default:
            return state;
    }
}