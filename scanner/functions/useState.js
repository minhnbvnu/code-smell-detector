function useState(initialState) {
              {
                currentHookNameInDev = "useState";
              }
              return useReducer(
                basicStateReducer,
                // useReducer has a special case to support lazy useState initializers
                initialState
              );
            }