function reportObjectPossiblyNullOrUndefinedError(node, facts) {
                const nodeText2 = isEntityNameExpression(node) ? entityNameToString(node) : void 0;
                if (node.kind === 104 /* NullKeyword */) {
                    error(node, Diagnostics.The_value_0_cannot_be_used_here, "null");
                    return;
                }
                if (nodeText2 !== void 0 && nodeText2.length < 100) {
                    if (isIdentifier(node) && nodeText2 === "undefined") {
                        error(node, Diagnostics.The_value_0_cannot_be_used_here, "undefined");
                        return;
                    }
                    error(node, facts & 16777216 /* IsUndefined */ ? facts & 33554432 /* IsNull */ ? Diagnostics._0_is_possibly_null_or_undefined : Diagnostics._0_is_possibly_undefined : Diagnostics._0_is_possibly_null, nodeText2);
                }
                else {
                    error(node, facts & 16777216 /* IsUndefined */ ? facts & 33554432 /* IsNull */ ? Diagnostics.Object_is_possibly_null_or_undefined : Diagnostics.Object_is_possibly_undefined : Diagnostics.Object_is_possibly_null);
                }
            }