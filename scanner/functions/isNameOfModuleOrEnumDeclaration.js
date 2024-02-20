function isNameOfModuleOrEnumDeclaration(node) {
                return isModuleOrEnumDeclaration(node.parent) && node === node.parent.name;
            }