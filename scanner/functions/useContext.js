function useContext(context) {
              {
                currentHookNameInDev = "useContext";
              }
              resolveCurrentlyRenderingComponent();
              return readContext(context);
            }