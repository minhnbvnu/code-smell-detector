function getSpecialPropertyAssignmentSymbolFromEntityName(entityName) {
                const specialPropertyAssignmentKind = getAssignmentDeclarationKind(entityName.parent.parent);
                switch (specialPropertyAssignmentKind) {
                    case 1 /* ExportsProperty */:
                    case 3 /* PrototypeProperty */:
                        return getSymbolOfNode(entityName.parent);
                    case 4 /* ThisProperty */:
                    case 2 /* ModuleExports */:
                    case 5 /* Property */:
                        return getSymbolOfDeclaration(entityName.parent.parent);
                }
            }