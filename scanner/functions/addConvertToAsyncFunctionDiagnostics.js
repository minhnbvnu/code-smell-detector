function addConvertToAsyncFunctionDiagnostics(node, checker, diags) {
            if (isConvertibleFunction(node, checker) && !visitedNestedConvertibleFunctions.has(getKeyFromNode(node))) {
                diags.push(createDiagnosticForNode(!node.name && isVariableDeclaration(node.parent) && isIdentifier(node.parent.name) ? node.parent.name : node, Diagnostics.This_may_be_converted_to_an_async_function));
            }
        }