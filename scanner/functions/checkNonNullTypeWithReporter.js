function checkNonNullTypeWithReporter(type, node, reportError) {
                if (strictNullChecks && type.flags & 2 /* Unknown */) {
                    if (isEntityNameExpression(node)) {
                        const nodeText2 = entityNameToString(node);
                        if (nodeText2.length < 100) {
                            error(node, Diagnostics._0_is_of_type_unknown, nodeText2);
                            return errorType;
                        }
                    }
                    error(node, Diagnostics.Object_is_of_type_unknown);
                    return errorType;
                }
                const facts = getTypeFacts(type);
                if (facts & 50331648 /* IsUndefinedOrNull */) {
                    reportError(node, facts);
                    const t = getNonNullableType(type);
                    return t.flags & (98304 /* Nullable */ | 131072 /* Never */) ? errorType : t;
                }
                return type;
            }