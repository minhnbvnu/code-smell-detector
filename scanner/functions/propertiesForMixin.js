function propertiesForMixin(mixin) {
  let properties = [];

  if (mixin.mixins) {
    mixin.mixins.forEach((mixin) => {
      if (mixin.properties) {
        addProperties(properties, mixin.properties);
      }
    });
  }

  return properties;
}