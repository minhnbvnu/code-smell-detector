function getIDToAttachAnnotation() {
                                        if (node.type !== utils_1.AST_NODE_TYPES.PropertyDefinition) {
                                            return lhsName;
                                        }
                                        if (!node.computed) {
                                            return node.key;
                                        }
                                        // If the property's computed, we have to attach the
                                        // annotation after the square bracket, not the enclosed expression
                                        return sourceCode.getTokenAfter(node.key);
                                    }