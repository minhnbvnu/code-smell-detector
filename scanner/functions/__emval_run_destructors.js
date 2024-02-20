function __emval_run_destructors(handle) {
          var destructors = Emval.toValue(handle);
          runDestructors(destructors);
          __emval_decref(handle);
        }