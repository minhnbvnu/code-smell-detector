function pushTypeAliases(state, typeAliases) {
  state.g.typeAliasScopes.unshift(typeAliases);
}