function declareIdentInLocalScope(identName, metaData, state) {
  state.localScope.identifiers[identName] = {
    boundaryNode: metaData.boundaryNode,
    path: metaData.bindingPath,
    node: metaData.bindingNode,
    state: Object.create(state)
  };
}