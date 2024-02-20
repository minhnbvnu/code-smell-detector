function basicStateReducer(state, action) {
              return typeof action === "function" ? action(state) : action;
            }