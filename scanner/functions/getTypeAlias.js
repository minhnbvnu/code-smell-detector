function getTypeAlias(id, state) {
  var typeAliasScopes = state.g.typeAliasScopes;
  for (var ii = 0; ii < typeAliasScopes.length; ii++) {
    var typeAliasAnnotation = typeAliasScopes[ii][id.name];
    if (typeAliasAnnotation) {
      return typeAliasAnnotation;
    }
  }
  return null;
}