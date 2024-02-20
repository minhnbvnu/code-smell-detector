function provideCallHierarchyIncomingCalls(fileName, position) {
                synchronizeHostData();
                const sourceFile = getValidSourceFile(fileName);
                const declaration = firstOrOnly(ts_CallHierarchy_exports.resolveCallHierarchyDeclaration(program, position === 0 ? sourceFile : getTouchingPropertyName(sourceFile, position)));
                return declaration ? ts_CallHierarchy_exports.getIncomingCalls(program, declaration, cancellationToken) : [];
            }