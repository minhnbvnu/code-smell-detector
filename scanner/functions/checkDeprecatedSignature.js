function checkDeprecatedSignature(signature, node) {
                if (signature.declaration && signature.declaration.flags & 268435456 /* Deprecated */) {
                    const suggestionNode = getDeprecatedSuggestionNode(node);
                    const name = tryGetPropertyAccessOrIdentifierToString(getInvokedExpression(node));
                    addDeprecatedSuggestionWithSignature(suggestionNode, signature.declaration, name, signatureToString(signature));
                }
            }