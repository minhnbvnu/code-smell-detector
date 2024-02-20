function checkGrammarAsyncModifier(node, asyncModifier) {
                switch (node.kind) {
                    case 171 /* MethodDeclaration */:
                    case 259 /* FunctionDeclaration */:
                    case 215 /* FunctionExpression */:
                    case 216 /* ArrowFunction */:
                        return false;
                }
                return grammarErrorOnNode(asyncModifier, Diagnostics._0_modifier_cannot_be_used_here, "async");
            }