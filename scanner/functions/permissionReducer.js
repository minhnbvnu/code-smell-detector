function permissionReducer(state = (localStorage.getItem("permissions") && localStorage.getItem("permissions").split(",")) || [], action) {
    switch (action.type) {
        case SET_PERMISSIONS :
            return action.permissions;
        default:
            return state;
    }
}