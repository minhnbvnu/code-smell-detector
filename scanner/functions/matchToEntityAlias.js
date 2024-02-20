function matchToEntityAlias({
  paramItem,
  identifiers,
  record,
  entities = {},
  allowMatchOnKeys = false,
} = {}) {
  let entity;
  if (paramItem && v.isFunction(paramItem[TransactionCommitSymbol])) {
    const committed = paramItem[TransactionCommitSymbol]();
    entity = committed.entity;
  }

  let entityAlias;
  for (let { name, version, nameField, versionField, alias } of identifiers) {
    if (
      entity &&
      entity.model.entity === name &&
      entity.model.version === version
    ) {
      entityAlias = alias;
      break;
    } else if (
      record[nameField] !== undefined &&
      record[versionField] !== undefined &&
      record[nameField] === name &&
      record[versionField] === version
    ) {
      entityAlias = alias;
      break;
      // } else if (allowMatchOnKeys && entities[alias] && entities[alias].ownsKeys({keys: record})) {
      // 	if (entityAlias) {
      // 		if (alias !== entityAlias) {
      // 			throw new Error('Key ownership found to be not distinct');
      // 		}
      // 	} else {
      // 		entityAlias = alias;
      // 	}
      // }
    } else if (entities[alias] && entities[alias].ownsKeys(record)) {
      entityAlias = alias;
      break;
    }
  }

  return entityAlias;
}