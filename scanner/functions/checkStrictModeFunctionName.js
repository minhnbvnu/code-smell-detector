function checkStrictModeFunctionName(node) {
                if (inStrictMode) {
                    checkStrictModeEvalOrArguments(node, node.name);
                }
            }