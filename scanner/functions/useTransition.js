function useTransition() {
              resolveCurrentlyRenderingComponent();
              return [false, unsupportedStartTransition];
            }