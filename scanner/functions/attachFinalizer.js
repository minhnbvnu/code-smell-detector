function attachFinalizer(handle) {
          if (typeof FinalizationRegistry === "undefined") {
            attachFinalizer = (handle2) => handle2;
            return handle;
          }
          finalizationRegistry = new FinalizationRegistry((info) => {
            releaseClassHandle(info.$$);
          });
          attachFinalizer = (handle2) => {
            var $$ = handle2.$$;
            var hasSmartPtr = !!$$.smartPtr;
            if (hasSmartPtr) {
              var info = { $$ };
              finalizationRegistry.register(handle2, info, handle2);
            }
            return handle2;
          };
          detachFinalizer = (handle2) => finalizationRegistry.unregister(handle2);
          return attachFinalizer(handle);
        }