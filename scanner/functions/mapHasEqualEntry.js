function mapHasEqualEntry(set, map, key1, item1, opts, channel) {
    var i = getIterator$1(set);
    var result;
    var key2;
    while ((result = i.next()) && !result.done) {
      key2 = result.value;
      if (
        // eslint-disable-next-line no-use-before-define
        internalDeepEqual(key1, key2, opts, channel) && internalDeepEqual(item1, $mapGet$1(map, key2), opts, channel)
      ) {
        $setDelete(set, key2);
        return true;
      }
    }
    return false;
  }