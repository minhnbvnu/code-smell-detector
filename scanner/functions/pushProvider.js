function pushProvider(context, nextValue) {
              var prevValue;
              {
                prevValue = context._currentValue;
                context._currentValue = nextValue;
                {
                  if (context._currentRenderer !== void 0 && context._currentRenderer !== null && context._currentRenderer !== rendererSigil) {
                    error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.");
                  }
                  context._currentRenderer = rendererSigil;
                }
              }
              var prevNode = currentActiveSnapshot;
              var newNode = {
                parent: prevNode,
                depth: prevNode === null ? 0 : prevNode.depth + 1,
                context,
                parentValue: prevValue,
                value: nextValue
              };
              currentActiveSnapshot = newNode;
              return newNode;
            }