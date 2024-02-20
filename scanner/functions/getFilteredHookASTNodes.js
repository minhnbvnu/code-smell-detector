function getFilteredHookASTNodes(potentialReactHookASTNode, potentialHooksFound, source) {
  let nodesAssociatedWithReactHookASTNode = [];

  if (nodeContainsHookVariableName(potentialReactHookASTNode)) {
    // made custom hooks to enter this, always
    // Case 1.
    // Directly usable Node -> const ref = useRef(null);
    //                      -> const [tick, setTick] = useState(1);
    // Case 2.
    // Custom Hooks -> const someVariable = useSomeCustomHook();
    //              -> const [someVariable, someFunction] = useAnotherCustomHook();
    nodesAssociatedWithReactHookASTNode.unshift(potentialReactHookASTNode);
  } else {
    // Case 3.
    // Indirectly usable Node -> const tickState = useState(1);
    //                           [tick, setTick] = tickState;
    //                        -> const tickState = useState(1);
    //                           const tick = tickState[0];
    //                           const setTick = tickState[1];
    nodesAssociatedWithReactHookASTNode = potentialHooksFound.filter(hookNode => filterMemberNodesOfTargetHook(potentialReactHookASTNode, hookNode));
  }

  return nodesAssociatedWithReactHookASTNode;
}