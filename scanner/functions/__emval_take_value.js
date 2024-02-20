function __emval_take_value(type, arg) {
          type = requireRegisteredType(type, "_emval_take_value");
          var v = type["readValueFromPointer"](arg);
          return Emval.toHandle(v);
        }