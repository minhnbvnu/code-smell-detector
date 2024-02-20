function isPotentialHookDeclaration(path) {
  // The array potentialHooksFound will contain all potential hook declaration cases we support
  const nodePathInit = path.node.init;

  if (nodePathInit != null) {
    if (nodePathInit.type === AST_NODE_TYPES.CALL_EXPRESSION) {
      // CASE: CallExpression
      // 1. const [count, setCount] = useState(0); -> destructured pattern
      // 2. const [A, setA] = useState(0), const [B, setB] = useState(0); -> multiple inline declarations
      // 3. const [
      //      count,
      //      setCount
      //    ] = useState(0); -> multiline hook declaration
      // 4. const ref = useRef(null); -> generic hooks
      const callee = nodePathInit.callee;
      return isHook(callee);
    } else if (nodePathInit.type === AST_NODE_TYPES.MEMBER_EXPRESSION || nodePathInit.type === AST_NODE_TYPES.IDENTIFIER) {
      // CASE: MemberExpression
      //    const countState = React.useState(0);
      //    const count = countState[0];
      //    const setCount = countState[1]; -> Accessing members following hook declaration
      // CASE: Identifier
      //    const countState = React.useState(0);
      //    const [count, setCount] = countState; ->  destructuring syntax following hook declaration
      return true;
    }
  }

  return false;
}