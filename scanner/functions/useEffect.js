function useEffect(create, deps) {
              var dispatcher = resolveDispatcher();
              return dispatcher.useEffect(create, deps);
            }