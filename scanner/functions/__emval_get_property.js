function __emval_get_property(handle, key) {
          handle = Emval.toValue(handle);
          key = Emval.toValue(key);
          return Emval.toHandle(handle[key]);
        }