function getHookNameFromNode(originalHook, nodesAssociatedWithReactHookASTNode, potentialReactHookASTNode) {
  let hookVariableName;
  const isCustomHook = originalHook.id === null;

  switch (nodesAssociatedWithReactHookASTNode.length) {
    case 1:
      // CASE 1A (nodesAssociatedWithReactHookASTNode[0] !== potentialReactHookASTNode):
      // const flagState = useState(true); -> later referenced as
      // const [flag, setFlag] = flagState;
      //
      // CASE 1B (nodesAssociatedWithReactHookASTNode[0] === potentialReactHookASTNode):
      // const [flag, setFlag] = useState(true); -> we have access to the hook variable straight away
      //
      // CASE 1C (isCustomHook && nodesAssociatedWithReactHookASTNode[0] === potentialReactHookASTNode):
      // const someVariable = useSomeCustomHook(); -> we have access to hook variable straight away
      // const [someVariable, someFunction] = useAnotherCustomHook(); -> we ignore variable names in this case
      //                                                                 as it is unclear what variable name to show
      if (isCustomHook && nodesAssociatedWithReactHookASTNode[0] === potentialReactHookASTNode) {
        hookVariableName = getHookVariableName(potentialReactHookASTNode, isCustomHook);
        break;
      }

      hookVariableName = getHookVariableName(nodesAssociatedWithReactHookASTNode[0]);
      break;

    case 2:
      // const flagState = useState(true); -> later referenced as
      // const flag = flagState[0];
      // const setFlag = flagState[1];
      nodesAssociatedWithReactHookASTNode = nodesAssociatedWithReactHookASTNode.filter(hookPath => filterMemberWithHookVariableName(hookPath));

      if (nodesAssociatedWithReactHookASTNode.length !== 1) {
        // Something went wrong, only a single desirable hook should remain here
        throw new Error("Couldn't isolate AST Node containing hook variable.");
      }

      hookVariableName = getHookVariableName(nodesAssociatedWithReactHookASTNode[0]);
      break;

    default:
      // Case 0:
      // const flagState = useState(true); -> which is not accessed anywhere
      //
      // Case > 2 (fallback):
      // const someState = React.useState(() => 0)
      //
      // const stateVariable = someState[0]
      // const setStateVariable = someState[1]
      //
      // const [number2, setNumber2] = someState
      //
      // We assign the state variable for 'someState' to multiple variables,
      // and hence cannot isolate a unique variable name. In such cases,
      // default to showing 'someState'
      hookVariableName = getHookVariableName(potentialReactHookASTNode);
      break;
  }

  return hookVariableName;
}