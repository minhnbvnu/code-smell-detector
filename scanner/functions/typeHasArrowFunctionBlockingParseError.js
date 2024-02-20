function typeHasArrowFunctionBlockingParseError(node) {
                        switch (node.kind) {
                            case 180 /* TypeReference */:
                                return nodeIsMissing(node.typeName);
                            case 181 /* FunctionType */:
                            case 182 /* ConstructorType */: {
                                const { parameters, type } = node;
                                return isMissingList(parameters) || typeHasArrowFunctionBlockingParseError(type);
                            }
                            case 193 /* ParenthesizedType */:
                                return typeHasArrowFunctionBlockingParseError(node.type);
                            default:
                                return false;
                        }
                    }