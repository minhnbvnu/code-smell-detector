function formatProvidedKeys(pk = {}, sks = []) {
  let keys = { ...pk };
  for (const sk of sks) {
    keys = { ...keys, ...sk.facets };
  }
  const provided = Object.keys(keys).map((key) => formatStrict(key));
  if (provided.length === 0) {
    return "";
  } else if (provided.length === 1) {
    return provided[0];
  } else if (provided.length === 2) {
    return provided.join(" and ");
  } else {
    provided[provided.length - 1] = `and ${provided[provided.length - 1]}`;
    return provided.join(", ");
  }
}