function groups(state, action) {
                        if (state === void 0) {
                            state = exports.defaultState;
                        }
                        if (action === void 0) {
                            action = {};
                        }
                        switch (action.type) {
                            case 'ADD_GROUP':
                                {
                                    var addGroupAction = action;
                                    return __spreadArray(__spreadArray([], state, true), [{
                                            id: addGroupAction.id,
                                            value: addGroupAction.value,
                                            active: addGroupAction.active,
                                            disabled: addGroupAction.disabled
                                        }], false);
                                }
                            case 'CLEAR_CHOICES':
                                {
                                    return [];
                                }
                            default:
                                {
                                    return state;
                                }
                        }
                    }