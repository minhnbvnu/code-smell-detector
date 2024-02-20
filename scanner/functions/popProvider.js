function popProvider(context) {
              var prevSnapshot = currentActiveSnapshot;
              if (prevSnapshot === null) {
                throw new Error("Tried to pop a Context at the root of the app. This is a bug in React.");
              }
              {
                if (prevSnapshot.context !== context) {
                  error("The parent context is not the expected context. This is probably a bug in React.");
                }
              }
              {
                var value = prevSnapshot.parentValue;
                if (value === REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED) {
                  prevSnapshot.context._currentValue = prevSnapshot.context._defaultValue;
                } else {
                  prevSnapshot.context._currentValue = value;
                }
                {
                  if (context._currentRenderer !== void 0 && context._currentRenderer !== null && context._currentRenderer !== rendererSigil) {
                    error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.");
                  }
                  context._currentRenderer = rendererSigil;
                }
              }
              return currentActiveSnapshot = prevSnapshot.parent;
            }