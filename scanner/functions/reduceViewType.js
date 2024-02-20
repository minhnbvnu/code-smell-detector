function reduceViewType(currentViewType, action) {
        switch (action.type) {
            case 'SET_VIEW_TYPE':
                return action.viewType;
            default:
                return currentViewType;
        }
    }