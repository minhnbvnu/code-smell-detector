function popTypeVariables(node, state) {
  var parameterDeclaration = node.typeParameters, scopeHistory;

  if (parameterDeclaration != null
      && parameterDeclaration.type === Syntax.TypeParameterDeclaration) {
    parameterDeclaration.params.forEach(function (id) {
      scopeHistory = state.g.typeVariableScopeDepth[id.name];
      state.g.typeVariableScopeDepth[id.name] = scopeHistory - 1;
    });
  }
}