function __emval_set_property(handle, key, value) {
          handle = Emval.toValue(handle);
          key = Emval.toValue(key);
          value = Emval.toValue(value);
          handle[key] = value;
        }