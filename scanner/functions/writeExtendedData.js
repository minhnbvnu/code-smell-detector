function writeExtendedData(node, namesAndValues, objectStack) {
  const /** @type {import("../xml.js").NodeStackItem} */ context = {node: node};
  const names = namesAndValues.names;
  const values = namesAndValues.values;
  const length = names.length;

  for (let i = 0; i < length; i++) {
    pushSerializeAndPop(
      context,
      EXTENDEDDATA_NODE_SERIALIZERS,
      DATA_NODE_FACTORY,
      [{name: names[i], value: values[i]}],
      objectStack,
    );
  }
}