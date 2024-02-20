function formatParamLabel(state, entity) {
  if (!state) {
    return null;
  } else if (typeof state === "string") {
    return `<h2>${state}</h2>`;
  } else {
    const method = state.query.method;
    const type = state.query.type;
    const collection = state.query.collection;
    const accessPattern =
      entity.model.translations.indexes.fromIndexToAccessPattern[
        state.query.index
      ];
    const keys = formatProvidedKeys(state.query.keys.pk, state.query.keys.sk);
    if (collection) {
      return `<h2>Queries the collection ${formatProper(
        collection,
      )}, on the service ${formatProper(
        entity.model.service,
      )}, by ${keys}</h2>`;
    } else if (method === "query") {
      return `<h2>Queries the access pattern ${formatProper(
        accessPattern,
      )}, on the entity ${formatProper(entity.model.name)}, by ${keys}</h2>`;
    } else if (state.self === "commit") {
      // handled inside the "client" so each operation doesn't get its own printed line
    } else {
      return `<h2>Performs ${aOrAn(method)} ${formatProper(
        method,
      )} operation, on the entity ${formatProper(entity.model.name)}</h2>`;
    }
  }
}