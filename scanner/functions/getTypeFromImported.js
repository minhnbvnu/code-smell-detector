function getTypeFromImported(imported) {
                var _a;
                const type = typeChecker.getTypeAtLocation(parserServices.esTreeNodeToTSNodeMap.get(imported));
                const valueDeclaration = (_a = type.getSymbol()) === null || _a === void 0 ? void 0 : _a.valueDeclaration;
                if (!valueDeclaration ||
                    !ts.isEnumDeclaration(valueDeclaration) ||
                    valueDeclaration.members.length === 0) {
                    return undefined;
                }
                return getAllowedTypeForNode(valueDeclaration.members[0]);
            }