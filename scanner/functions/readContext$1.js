function readContext$1(context) {
              {
                if (isInHookUserCodeInDev) {
                  error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
                }
              }
              return readContext(context);
            }