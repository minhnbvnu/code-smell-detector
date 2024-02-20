function __emval_incref(handle) {
          if (handle > 4) {
            emval_handle_array[handle].refcount += 1;
          }
        }