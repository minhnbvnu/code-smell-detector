function matchesFilter(filter, basename, loc) {
  let filterByBasename = true;
  if (filter.base && filter.base !== '.') {
    loc = path.relative(filter.base, loc);
    filterByBasename = false;
  }
  // the micromatch regex expects unix path separators
  loc = loc.replace(/\\/g, '/');

  return filter.regex.test(loc) || filter.regex.test(`/${loc}`) || filterByBasename && filter.regex.test(basename) || mm.isMatch(loc, filter.pattern);
}