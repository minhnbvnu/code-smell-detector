function handleFunction(node) {
                // Skip recursive functions.
                const nameVar = context.getDeclaredVariables(node)[0];
                if (isFunctionName(nameVar) && nameVar.references.length > 0) {
                    return;
                }
                const hasName = Boolean(node.id && node.id.name);
                const config = getConfigForNode(node);
                if (config === "never") {
                    if (hasName && node.type !== "FunctionDeclaration") {
                        reportUnexpectedNamedFunction(node);
                    }
                }
                else if (config === "as-needed") {
                    if (!hasName && !hasInferredName(node)) {
                        reportUnexpectedUnnamedFunction(node);
                    }
                }
                else {
                    if (!hasName && !isObjectOrClassMethod(node)) {
                        reportUnexpectedUnnamedFunction(node);
                    }
                }
            }