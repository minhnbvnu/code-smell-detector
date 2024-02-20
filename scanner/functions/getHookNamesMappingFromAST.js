function getHookNamesMappingFromAST(sourceAST) {
  const hookStack = [];
  const hookNames = [];

  const pushFrame = (name, node) => {
    const nameInfo = {
      name,
      start: { ...node.loc.start
      }
    };
    hookStack.unshift(nameInfo);
    hookNames.push(nameInfo);
  };

  const popFrame = node => {
    hookStack.shift();
    const top = hookStack[0];

    if (top != null) {
      hookNames.push({
        name: top.name,
        start: { ...node.loc.end
        }
      });
    }
  };

  traverse_lib_default()(sourceAST, {
    [AST_NODE_TYPES.PROGRAM]: {
      enter(path) {
        pushFrame(NO_HOOK_NAME, path.node);
      },

      exit(path) {
        popFrame(path.node);
      }

    },
    [AST_NODE_TYPES.VARIABLE_DECLARATOR]: {
      enter(path) {
        // Check if this variable declaration corresponds to a variable
        // declared by calling a Hook.
        if (isConfirmedHookDeclaration(path)) {
          var _path$scope$bindings$;

          const hookDeclaredVariableName = getHookVariableName(path);

          if (!hookDeclaredVariableName) {
            return;
          }

          const callExpressionNode = assertCallExpression(path.node.init); // Check if this variable declaration corresponds to a call to a
          // built-in Hook that returns a tuple (useState, useReducer,
          // useTransition).
          // If it doesn't, we immediately use the declared variable name
          // as the Hook name. We do this because for any other Hooks that
          // aren't the built-in Hooks that return a tuple, we can't reliably
          // extract a Hook name from other variable declarations derived from
          // this one, since we don't know which of the declared variables
          // are the relevant ones to track and show in dev tools.

          if (!isBuiltInHookThatReturnsTuple(path)) {
            pushFrame(hookDeclaredVariableName, callExpressionNode);
            return;
          } // Check if the variable declared by the Hook call is referenced
          // anywhere else in the code. If not, we immediately use the
          // declared variable name as the Hook name.


          const referencePaths = hookDeclaredVariableName != null ? (_path$scope$bindings$ = path.scope.bindings[hookDeclaredVariableName]) === null || _path$scope$bindings$ === void 0 ? void 0 : _path$scope$bindings$.referencePaths : null;

          if (referencePaths == null) {
            pushFrame(hookDeclaredVariableName, callExpressionNode);
            return;
          } // Check each reference to the variable declared by the Hook call,
          // and for each, we do the following:


          let declaredVariableName = null;

          for (let i = 0; i <= referencePaths.length; i++) {
            var _variableDeclaratorPa;

            const referencePath = referencePaths[i];

            if (declaredVariableName != null) {
              break;
            } // 1. Check if the reference is contained within a VariableDeclarator
            // Node. This will allow us to determine if the variable declared by
            // the Hook call is being used to declare other variables.


            let variableDeclaratorPath = referencePath;

            while (variableDeclaratorPath != null && variableDeclaratorPath.node.type !== AST_NODE_TYPES.VARIABLE_DECLARATOR) {
              variableDeclaratorPath = variableDeclaratorPath.parentPath;
            } // 2. If we find a VariableDeclarator containing the
            // referenced variable, we extract the Hook name from the new
            // variable declaration.
            // E.g., a case like the following:
            //    const countState = useState(0);
            //    const count = countState[0];
            //    const setCount = countState[1]
            // Where the reference to `countState` is later referenced
            // within a VariableDeclarator, so we can extract `count` as
            // the Hook name.


            const varDeclInit = (_variableDeclaratorPa = variableDeclaratorPath) === null || _variableDeclaratorPa === void 0 ? void 0 : _variableDeclaratorPa.node.init;

            if (varDeclInit != null) {
              switch (varDeclInit.type) {
                case AST_NODE_TYPES.MEMBER_EXPRESSION:
                  {
                    // When encountering a MemberExpression inside the new
                    // variable declaration, we only want to extract the variable
                    // name if we're assigning the value of the first member,
                    // which is handled by `filterMemberWithHookVariableName`.
                    // E.g.
                    //    const countState = useState(0);
                    //    const count = countState[0];    -> extract the name from this reference
                    //    const setCount = countState[1]; -> ignore this reference
                    if (filterMemberWithHookVariableName(variableDeclaratorPath)) {
                      declaredVariableName = getHookVariableName(variableDeclaratorPath);
                    }

                    break;
                  }

                case AST_NODE_TYPES.IDENTIFIER:
                  {
                    declaredVariableName = getHookVariableName(variableDeclaratorPath);
                    break;
                  }

                default:
                  break;
              }
            }
          } // If we were able to extract a name from the new variable
          // declaration, use it as the Hook name. Otherwise, use the
          // original declared variable as the variable name.


          if (declaredVariableName != null) {
            pushFrame(declaredVariableName, callExpressionNode);
          } else {
            pushFrame(hookDeclaredVariableName, callExpressionNode);
          }
        }
      },

      exit(path) {
        if (isConfirmedHookDeclaration(path)) {
          const callExpressionNode = assertCallExpression(path.node.init);
          popFrame(callExpressionNode);
        }
      }

    }
  });
  return hookNames;
}