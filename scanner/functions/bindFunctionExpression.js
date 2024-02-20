function bindFunctionExpression(node) {
                if (!file.isDeclarationFile && !(node.flags & 16777216 /* Ambient */)) {
                    if (isAsyncFunction(node)) {
                        emitFlags |= 2048 /* HasAsyncFunctions */;
                    }
                }
                if (currentFlow) {
                    node.flowNode = currentFlow;
                }
                checkStrictModeFunctionName(node);
                const bindingName = node.name ? node.name.escapedText : "__function" /* Function */;
                return bindAnonymousDeclaration(node, 16 /* Function */, bindingName);
            }