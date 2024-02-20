function checkIntersectionBottomAndTopTypes({ typeFlags, typeName }, typeNode) {
                        for (const [messageId, checkFlag] of [
                            ['overrides', ts.TypeFlags.Any],
                            ['overrides', ts.TypeFlags.Never],
                            ['overridden', ts.TypeFlags.Unknown],
                        ]) {
                            if (typeFlags === checkFlag) {
                                context.report({
                                    data: {
                                        container: 'intersection',
                                        typeName,
                                    },
                                    messageId,
                                    node: typeNode,
                                });
                                return true;
                            }
                        }
                        return false;
                    }