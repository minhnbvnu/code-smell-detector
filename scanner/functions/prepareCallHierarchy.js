function prepareCallHierarchy(fileName, position) {
                synchronizeHostData();
                const declarations = ts_CallHierarchy_exports.resolveCallHierarchyDeclaration(program, getTouchingPropertyName(getValidSourceFile(fileName), position));
                return declarations && mapOneOrMany(declarations, (declaration) => ts_CallHierarchy_exports.createCallHierarchyItem(program, declaration));
            }