function cacheExpression(node) {
                if (isGeneratedIdentifier(node) || getEmitFlags(node) & 8192 /* HelperName */) {
                    return node;
                }
                const temp = factory2.createTempVariable(hoistVariableDeclaration);
                emitAssignment(temp, node, 
                /*location*/
                node);
                return temp;
            }