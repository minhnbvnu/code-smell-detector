function fixMandatorySetters(mixinDetails) {
  let seen = {};
  let propertiesToRemove = [];

  mixinDetails.forEach((detail, detailIdx) => {
    detail.properties.forEach((property) => {
      if (property.isMandatorySetter) {
        seen[property.name] = {
          name: property.name,
          value: property.value.inspect,
          detailIdx,
          property,
        };
      } else if (seen.hasOwnProperty(property.name) && seen[property.name]) {
        propertiesToRemove.push(seen[property.name]);
        delete seen[property.name];
      }
    });
  });

  propertiesToRemove.forEach((prop) => {
    let detail = mixinDetails[prop.detailIdx];
    let index = detail.properties.indexOf(prop.property);
    if (index !== -1) {
      detail.properties.splice(index, 1);
    }
  });
}