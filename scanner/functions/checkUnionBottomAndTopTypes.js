function checkUnionBottomAndTopTypes({ typeFlags, typeName }, typeNode) {
                        for (const checkFlag of [
                            ts.TypeFlags.Any,
                            ts.TypeFlags.Unknown,
                        ]) {
                            if (typeFlags === checkFlag) {
                                context.report({
                                    data: {
                                        container: 'union',
                                        typeName,
                                    },
                                    messageId: 'overrides',
                                    node: typeNode,
                                });
                                return true;
                            }
                        }
                        if (typeFlags === ts.TypeFlags.Never &&
                            !isNodeInsideReturnType(node)) {
                            context.report({
                                data: {
                                    container: 'union',
                                    typeName: 'never',
                                },
                                messageId: 'overridden',
                                node: typeNode,
                            });
                            return true;
                        }
                        return false;
                    }