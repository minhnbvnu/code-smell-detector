function applyMixinOverrides(mixinDetails) {
  let seen = {};
  mixinDetails.forEach((detail) => {
    detail.properties.forEach((property) => {
      if (Object.prototype.hasOwnProperty(property.name)) {
        return;
      }

      if (seen[property.name]) {
        property.overridden = seen[property.name];
        delete property.value.isCalculated;
      }

      seen[property.name] = detail.name;
    });
  });
}