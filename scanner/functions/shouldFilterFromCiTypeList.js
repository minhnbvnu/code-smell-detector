function shouldFilterFromCiTypeList(type, excludeList) {
  type = type.toLowerCase();
  const isInExcludeList = excludeList.find(
    (exclude) =>
      exclude.toLowerCase() == type ||
      (type.startsWith("external resource") && type.includes(exclude))
  );

  return !isInExcludeList;
}