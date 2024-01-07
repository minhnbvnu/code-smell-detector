function like(
  propertyName,
  pattern,
  wildCard,
  singleChar,
  escapeChar,
  matchCase,
) {
  return new IsLike(
    propertyName,
    pattern,
    wildCard,
    singleChar,
    escapeChar,
    matchCase,
  );
}