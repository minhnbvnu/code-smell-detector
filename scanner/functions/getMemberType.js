function getMemberType(member) {
                if (!member.initializer) {
                    return AllowedType.Number;
                }
                switch (member.initializer.type) {
                    case utils_1.AST_NODE_TYPES.Literal:
                        switch (typeof member.initializer.value) {
                            case 'number':
                                return AllowedType.Number;
                            case 'string':
                                return AllowedType.String;
                            default:
                                return AllowedType.Unknown;
                        }
                    case utils_1.AST_NODE_TYPES.TemplateLiteral:
                        return AllowedType.String;
                    default:
                        return getAllowedTypeForNode(parserServices.esTreeNodeToTSNodeMap.get(member.initializer));
                }
            }