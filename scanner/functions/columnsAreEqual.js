function columnsAreEqual(oldColumns, newColumns) {
  return isEqualWith(
    oldColumns,
    newColumns,
    (a, b) => {
      if (isFunction(a) && isFunction(b)) {
        return true;
      }

      return undefined;
    }
  );
}