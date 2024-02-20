function cleanseTransactionData(
  index = TableIndex,
  entities,
  data = {},
  config = {},
) {
  if (config.raw) {
    return data;
  }
  const identifiers = getEntityIdentifiers(entities);
  data.Items = data.Items || [];
  const paramItems = config._paramItems || [];
  const results = [];
  for (let i = 0; i < data.Items.length; i++) {
    const record = data.Items[i];
    if (!record) {
      results.push(null);
      continue;
    }

    const paramItem = paramItems[i];
    const entityAlias = matchToEntityAlias({ paramItem, identifiers, record });
    if (!entityAlias) {
      continue;
    }

    // pager=false because we don't want the entity trying to parse the lastEvaluatedKey
    let formatted = entities[entityAlias].formatResponse(
      { Item: record },
      index,
      {
        ...config,
        pager: false,
        parse: undefined,
      },
    );

    results.push(formatted.data);
  }

  return results.map((item) => ({
    rejected: false,
    item,
  }));
}