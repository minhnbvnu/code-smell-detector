function pushTypeVariables(node, state) {
  var parameterDeclaration = node.typeParameters, scopeHistory;

  if (parameterDeclaration != null
      && parameterDeclaration.type === Syntax.TypeParameterDeclaration) {
    parameterDeclaration.params.forEach(function (id) {
      scopeHistory = state.g.typeVariableScopeDepth[id.name] || 0;
      state.g.typeVariableScopeDepth[id.name] = scopeHistory + 1;
    });
  }
}