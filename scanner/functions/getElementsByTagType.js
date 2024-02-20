function getElementsByTagType(type, nodes, recurse, limit) {
  if (recurse === void 0) {
    recurse = true;
  }
  if (limit === void 0) {
    limit = Infinity;
  }
  return (0, querying_1.filter)(Checks.tag_type(type), nodes, recurse, limit);
}