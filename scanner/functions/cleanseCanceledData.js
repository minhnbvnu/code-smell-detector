function cleanseCanceledData(
  index = TableIndex,
  entities,
  data = {},
  config = {},
) {
  if (config.raw) {
    return data;
  }
  const identifiers = getEntityIdentifiers(entities);
  const canceled = data.canceled || [];
  const paramItems = config._paramItems || [];
  const results = [];
  for (let i = 0; i < canceled.length; i++) {
    const { Item, Code, Message } = canceled[i] || {};
    const paramItem = paramItems[i];
    const code = Code || "None";
    const rejected = code !== "None";
    const result = {
      rejected,
      code,
      message: Message,
    };

    if (Item) {
      const entityAlias = matchToEntityAlias({
        record: Item,
        paramItem,
        identifiers,
      });
      result.item = entities[entityAlias].formatResponse({ Item }, index, {
        ...config,
        pager: false,
        parse: undefined,
      }).data;
    } else {
      result.item = null;
    }

    results.push(result);
  }

  return results;
}