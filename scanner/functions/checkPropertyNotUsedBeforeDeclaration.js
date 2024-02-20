function checkPropertyNotUsedBeforeDeclaration(prop, node, right) {
                const { valueDeclaration } = prop;
                if (!valueDeclaration || getSourceFileOfNode(node).isDeclarationFile) {
                    return;
                }
                let diagnosticMessage;
                const declarationName = idText(right);
                if (isInPropertyInitializerOrClassStaticBlock(node) && !isOptionalPropertyDeclaration(valueDeclaration) && !(isAccessExpression(node) && isAccessExpression(node.expression)) && !isBlockScopedNameDeclaredBeforeUse(valueDeclaration, right) && !(isMethodDeclaration(valueDeclaration) && getCombinedModifierFlags(valueDeclaration) & 32 /* Static */) && (compilerOptions.useDefineForClassFields || !isPropertyDeclaredInAncestorClass(prop))) {
                    diagnosticMessage = error(right, Diagnostics.Property_0_is_used_before_its_initialization, declarationName);
                }
                else if (valueDeclaration.kind === 260 /* ClassDeclaration */ && node.parent.kind !== 180 /* TypeReference */ && !(valueDeclaration.flags & 16777216 /* Ambient */) && !isBlockScopedNameDeclaredBeforeUse(valueDeclaration, right)) {
                    diagnosticMessage = error(right, Diagnostics.Class_0_used_before_its_declaration, declarationName);
                }
                if (diagnosticMessage) {
                    addRelatedInfo(diagnosticMessage, createDiagnosticForNode(valueDeclaration, Diagnostics._0_is_declared_here, declarationName));
                }
            }