function isOptionableExpression(node) {
                const type = getNodeType(node);
                const isOwnNullable = node.type === utils_1.AST_NODE_TYPES.MemberExpression
                    ? !isNullableOriginFromPrev(node)
                    : true;
                const possiblyVoid = (0, util_1.isTypeFlagSet)(type, ts.TypeFlags.Void);
                return ((0, util_1.isTypeFlagSet)(type, ts.TypeFlags.Any | ts.TypeFlags.Unknown) ||
                    (isOwnNullable &&
                        ((0, util_1.isNullableType)(type, { allowUndefined: true }) || possiblyVoid)));
            }