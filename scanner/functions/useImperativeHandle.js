function useImperativeHandle(ref, create, deps) {
              var dispatcher = resolveDispatcher();
              return dispatcher.useImperativeHandle(ref, create, deps);
            }