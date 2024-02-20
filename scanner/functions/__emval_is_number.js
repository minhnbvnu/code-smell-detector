function __emval_is_number(handle) {
          handle = Emval.toValue(handle);
          return typeof handle == "number";
        }