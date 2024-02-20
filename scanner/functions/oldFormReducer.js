function oldFormReducer(state = {}, action) {
    switch (action.type) {
        case SET_FORM_DATA:
            let newFormData = action.formData;
            if (typeof newFormData === "function") {
                newFormData = newFormData(state[action.name]);
            }
            return {
                ...state,
                [action.name]: newFormData
            };
        default:
            return state;
    }
}