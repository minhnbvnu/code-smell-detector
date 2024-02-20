function checkNonNullNonVoidType(type, node) {
                const nonNullType = checkNonNullType(type, node);
                if (nonNullType.flags & 16384 /* Void */) {
                    if (isEntityNameExpression(node)) {
                        const nodeText2 = entityNameToString(node);
                        if (isIdentifier(node) && nodeText2 === "undefined") {
                            error(node, Diagnostics.The_value_0_cannot_be_used_here, nodeText2);
                            return nonNullType;
                        }
                        if (nodeText2.length < 100) {
                            error(node, Diagnostics._0_is_possibly_undefined, nodeText2);
                            return nonNullType;
                        }
                    }
                    error(node, Diagnostics.Object_is_possibly_undefined);
                }
                return nonNullType;
            }