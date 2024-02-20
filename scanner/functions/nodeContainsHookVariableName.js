function nodeContainsHookVariableName(hookNode) {
  // We determine cases where variable names are obvious in declarations. Examples:
  // const [tick, setTick] = useState(1); OR const ref = useRef(null);
  // Here tick/ref are obvious hook variables in the hook declaration node itself
  // 1. True for satisfying above cases
  // 2. False for everything else. Examples:
  //    const countState = React.useState(0);
  //    const count = countState[0];
  //    const setCount = countState[1]; -> not obvious, hook variable can't be determined
  //                                       from the hook declaration node alone
  // 3. For custom hooks we force pass true since we are only concerned with the AST node
  //    regardless of how it is accessed in source code. (See: getHookVariableName)
  const node = hookNode.node.id;

  if (node.type === AST_NODE_TYPES.ARRAY_PATTERN || node.type === AST_NODE_TYPES.IDENTIFIER && !isBuiltInHookThatReturnsTuple(hookNode)) {
    return true;
  }

  return false;
}