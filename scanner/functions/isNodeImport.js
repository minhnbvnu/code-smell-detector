function isNodeImport(node) {
            const { parent: parent2 } = node;
            switch (parent2.kind) {
                case 268 /* ImportEqualsDeclaration */:
                    return parent2.name === node && isExternalModuleImportEquals(parent2);
                case 273 /* ImportSpecifier */:
                    return !parent2.propertyName;
                case 270 /* ImportClause */:
                case 271 /* NamespaceImport */:
                    Debug.assert(parent2.name === node);
                    return true;
                case 205 /* BindingElement */:
                    return isInJSFile(node) && isVariableDeclarationInitializedToBareOrAccessedRequire(parent2.parent.parent);
                default:
                    return false;
            }
        }