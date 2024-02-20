function __emval_new_cstring(v) {
          return Emval.toHandle(getStringOrSymbol(v));
        }