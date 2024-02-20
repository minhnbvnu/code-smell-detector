function __emval_decref(handle) {
          if (handle > 4 && --emval_handle_array[handle].refcount === 0) {
            emval_handle_array[handle] = void 0;
            emval_free_list.push(handle);
          }
        }