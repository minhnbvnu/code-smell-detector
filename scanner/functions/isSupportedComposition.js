function isSupportedComposition(isTopLevel, compositionType, allowed) {
                return (!compositions.includes(allowed) ||
                    (!isTopLevel &&
                        ((compositionType === utils_1.AST_NODE_TYPES.TSUnionType &&
                            unions.includes(allowed)) ||
                            (compositionType === utils_1.AST_NODE_TYPES.TSIntersectionType &&
                                intersections.includes(allowed)))));
            }