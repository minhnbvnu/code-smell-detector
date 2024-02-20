function renderChildNodes(props, from, to) {
  const {
    nodeType,
    data,
    collectionLimit,
    circularCache,
    keyPath,
    postprocessValue,
    sortObjectKeys
  } = props;
  const childNodes = [];

  getCollectionEntries(
    nodeType,
    data,
    sortObjectKeys,
    collectionLimit,
    from,
    to
  ).forEach(entry => {
    if (entry.to) {
      childNodes.push(
        <ItemRange
          {...props}
          key={`ItemRange--${entry.from}-${entry.to}`}
          from={entry.from}
          to={entry.to}
          renderChildNodes={renderChildNodes}
        />
      );
    } else {
      const { key, value } = entry;
      const isCircular = circularCache.indexOf(value) !== -1;

      const node = (
        <JSONNode
          {...props}
          {...{ postprocessValue, collectionLimit }}
          key={`Node--${key}`}
          keyPath={[key, ...keyPath]}
          value={postprocessValue(value)}
          circularCache={[...circularCache, value]}
          isCircular={isCircular}
          hideRoot={false}
        />
      );

      if (node !== false) {
        childNodes.push(node);
      }
    }
  });

  return childNodes;
}