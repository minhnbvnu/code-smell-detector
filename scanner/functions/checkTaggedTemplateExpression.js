function checkTaggedTemplateExpression(node) {
                if (!checkGrammarTaggedTemplateChain(node))
                    checkGrammarTypeArguments(node, node.typeArguments);
                if (languageVersion < 2 /* ES2015 */) {
                    checkExternalEmitHelpers(node, 262144 /* MakeTemplateObject */);
                }
                const signature = getResolvedSignature(node);
                checkDeprecatedSignature(signature, node);
                return getReturnTypeOfSignature(signature);
            }