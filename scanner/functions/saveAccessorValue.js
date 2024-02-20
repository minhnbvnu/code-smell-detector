function saveAccessorValue(model, property) {
    // Don't read/store value for any native properties since they could throw
    if (!nativeProperties[property]) {
      let value = model[property];
      if (value !== undefined) {
        if (model.__data) {
          // Adding accessor to instance; update the property
          // It is the user's responsibility to call _flushProperties
          model._setPendingProperty(property, value);
        } else {
          // Adding accessor to proto; save proto's value for instance-time use
          if (!model.__dataProto) {
            model.__dataProto = {};
          } else if (!model.hasOwnProperty(JSCompiler_renameProperty('__dataProto', model))) {
            model.__dataProto = Object.create(model.__dataProto);
          }
          model.__dataProto[property] = value;
        }
      }
    }
  }