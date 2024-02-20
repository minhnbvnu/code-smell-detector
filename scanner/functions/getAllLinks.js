function getAllLinks(items) {
  if (linksCache.has(items)) {
    return linksCache.get(items);
  }
  const res = {};
  linksCache.set(items, res);
  for (const item of items) {
    res[`xref-${item.anchor}`] = `xref:${item.__item_context.page}#${item.anchor}`;
    res[slug(item.fullName)] = `pass:normal[xref:${item.__item_context.page}#${item.anchor}[\`${item.fullName}\`]]`;
  }
  return res;
}