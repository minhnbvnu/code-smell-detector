function countStatements(node) {
                functionStack[functionStack.length - 1] += node.body.length;
            }