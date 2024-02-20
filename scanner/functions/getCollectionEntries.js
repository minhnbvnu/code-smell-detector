function getCollectionEntries(
  type,
  collection,
  sortObjectKeys,
  limit,
  from = 0,
  to = Infinity
) {
  const getEntriesBound = getEntries.bind(
    null,
    type,
    collection,
    sortObjectKeys
  );

  if (!limit) {
    return getEntriesBound().entries;
  }

  const isSubset = to < Infinity;
  const length = Math.min(to - from, getLength(type, collection));

  if (type !== 'Iterable') {
    if (length <= limit || limit < 7) {
      return getEntriesBound(from, to).entries;
    }
  } else {
    if (length <= limit && !isSubset) {
      return getEntriesBound(from, to).entries;
    }
  }

  let limitedEntries;
  if (type === 'Iterable') {
    const { hasMore, entries } = getEntriesBound(from, from + limit - 1);

    limitedEntries = hasMore
      ? [...entries, ...getRanges(from + limit, from + 2 * limit - 1, limit)]
      : entries;
  } else {
    limitedEntries = isSubset
      ? getRanges(from, to, limit)
      : [
          ...getEntriesBound(0, limit - 5).entries,
          ...getRanges(limit - 4, length - 5, limit),
          ...getEntriesBound(length - 4, length - 1).entries
        ];
  }

  return limitedEntries;
}