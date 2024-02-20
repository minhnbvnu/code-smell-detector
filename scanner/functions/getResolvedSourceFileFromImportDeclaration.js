function getResolvedSourceFileFromImportDeclaration(sourceFile, context, importDeclaration) {
            if (!importDeclaration || !isStringLiteralLike(importDeclaration.moduleSpecifier))
                return void 0;
            const resolvedModule = getResolvedModule(sourceFile, importDeclaration.moduleSpecifier.text, getModeForUsageLocation(sourceFile, importDeclaration.moduleSpecifier));
            if (!resolvedModule)
                return void 0;
            return context.program.getSourceFile(resolvedModule.resolvedFileName);
        }