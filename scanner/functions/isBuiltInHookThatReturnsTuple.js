function isBuiltInHookThatReturnsTuple(path) {
  const callee = path.node.init.callee;
  return isReactFunction(callee, 'useState') || isReactFunction(callee, 'useReducer') || isReactFunction(callee, 'useTransition');
}