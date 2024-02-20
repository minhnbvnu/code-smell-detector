function __emval_instanceof(object, constructor) {
          object = Emval.toValue(object);
          constructor = Emval.toValue(constructor);
          return object instanceof constructor;
        }