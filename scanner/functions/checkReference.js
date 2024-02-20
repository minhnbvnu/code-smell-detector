function checkReference(reference, index, references) {
                const identifier = reference.identifier;
                if (identifier &&
                    !reference.init &&
                    /*
                     * Destructuring assignments can have multiple default value,
                     * so possibly there are multiple writeable references for the same identifier.
                     */
                    (index === 0 || references[index - 1].identifier !== identifier)) {
                    if (reference.isWrite()) {
                        context.report({
                            node: identifier,
                            messageId: "assignmentToFunctionParam",
                            data: { name: identifier.name }
                        });
                    }
                    else if (props && isModifyingProp(reference) && !isIgnoredPropertyAssignment(identifier.name)) {
                        context.report({
                            node: identifier,
                            messageId: "assignmentToFunctionParamProp",
                            data: { name: identifier.name }
                        });
                    }
                }
            }