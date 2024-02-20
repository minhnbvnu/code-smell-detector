function getInfo15(sourceFile, pos) {
            const name = getTokenAtPosition(sourceFile, pos);
            if (!isIdentifier(name))
                return void 0;
            const { parent: parent2 } = name;
            if (isImportEqualsDeclaration(parent2) && isExternalModuleReference(parent2.moduleReference)) {
                return { importNode: parent2, name, moduleSpecifier: parent2.moduleReference.expression };
            }
            else if (isNamespaceImport(parent2)) {
                const importNode = parent2.parent.parent;
                return { importNode, name, moduleSpecifier: importNode.moduleSpecifier };
            }
        }