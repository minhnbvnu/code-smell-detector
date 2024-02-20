function standardizeDefinition(def) {
  const standardizedDef = Object.keys(def).reduce((newDef, prop) => {
    if (!oneOfProps.includes(prop)) {
      newDef[prop] = def[prop];
    }
    return newDef;
  }, {});

  // Internally, all definition types are stored as groups for simplicity of access.
  // If we are extending, there may not actually be def.type, but it's okay because
  // it will be added later when the two SimpleSchemaGroups are merged.
  if (def.type && def.type instanceof SimpleSchemaGroup) {
    standardizedDef.type = def.type.clone();
  } else {
    const groupProps = Object.keys(def).reduce((newDef, prop) => {
      if (oneOfProps.includes(prop)) {
        newDef[prop] = def[prop];
      }
      return newDef;
    }, {});
    standardizedDef.type = new SimpleSchemaGroup(groupProps);
  }

  return standardizedDef;
}