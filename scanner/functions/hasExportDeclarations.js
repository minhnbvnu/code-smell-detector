function hasExportDeclarations(node) {
                const body = isSourceFile(node) ? node : tryCast(node.body, isModuleBlock);
                return !!body && body.statements.some((s) => isExportDeclaration(s) || isExportAssignment(s));
            }