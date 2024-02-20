function addMethodDeclaration(context, changes, callExpression, name, modifierFlags, parentDeclaration, sourceFile) {
            const importAdder = createImportAdder(sourceFile, context.program, context.preferences, context.host);
            const kind = isClassLike(parentDeclaration) ? 171 /* MethodDeclaration */ : 170 /* MethodSignature */;
            const signatureDeclaration = createSignatureDeclarationFromCallExpression(kind, context, importAdder, callExpression, name, modifierFlags, parentDeclaration);
            const containingMethodDeclaration = tryGetContainingMethodDeclaration(parentDeclaration, callExpression);
            if (containingMethodDeclaration) {
                changes.insertNodeAfter(sourceFile, containingMethodDeclaration, signatureDeclaration);
            }
            else {
                changes.insertMemberAtStart(sourceFile, parentDeclaration, signatureDeclaration);
            }
            importAdder.writeFixes(changes);
        }