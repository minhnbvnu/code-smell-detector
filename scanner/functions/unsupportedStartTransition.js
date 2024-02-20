function unsupportedStartTransition() {
              throw new Error("startTransition cannot be called during server rendering.");
            }