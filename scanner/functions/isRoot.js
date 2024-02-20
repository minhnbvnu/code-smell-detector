function isRoot(el) {
  return rootSelectors().some((selector) => el.matches(selector));
}