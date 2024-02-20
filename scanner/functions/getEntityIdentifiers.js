function getEntityIdentifiers(entities) {
  let identifiers = [];
  for (let alias of Object.keys(entities)) {
    let entity = entities[alias];
    let name = entity.model.entity;
    let version = entity.model.version;
    identifiers.push({
      name,
      alias,
      version,
      entity,
      nameField: entity.identifiers.entity,
      versionField: entity.identifiers.version,
    });
  }
  return identifiers;
}