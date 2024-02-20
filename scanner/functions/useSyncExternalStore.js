function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
              if (getServerSnapshot === void 0) {
                throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
              }
              return getServerSnapshot();
            }