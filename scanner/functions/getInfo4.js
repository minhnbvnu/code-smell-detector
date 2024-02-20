function getInfo4(sourceFile, pos, program) {
            var _a2;
            const token = getTokenAtPosition(sourceFile, pos);
            if (isIdentifier(token)) {
                const importDeclaration = findAncestor(token, isImportDeclaration);
                if (importDeclaration === void 0)
                    return void 0;
                const moduleSpecifier = isStringLiteral(importDeclaration.moduleSpecifier) ? importDeclaration.moduleSpecifier.text : void 0;
                if (moduleSpecifier === void 0)
                    return void 0;
                const resolvedModule = getResolvedModule(sourceFile, moduleSpecifier, 
                /*mode*/
                void 0);
                if (resolvedModule === void 0)
                    return void 0;
                const moduleSourceFile = program.getSourceFile(resolvedModule.resolvedFileName);
                if (moduleSourceFile === void 0 || isSourceFileFromLibrary(program, moduleSourceFile))
                    return void 0;
                const moduleSymbol = moduleSourceFile.symbol;
                const locals = (_a2 = tryCast(moduleSymbol.valueDeclaration, canHaveLocals)) == null ? void 0 : _a2.locals;
                if (locals === void 0)
                    return void 0;
                const localSymbol = locals.get(token.escapedText);
                if (localSymbol === void 0)
                    return void 0;
                const node = getNodeOfSymbol(localSymbol);
                if (node === void 0)
                    return void 0;
                const exportName = { node: token, isTypeOnly: isTypeDeclaration(node) };
                return { exportName, node, moduleSourceFile, moduleSpecifier };
            }
            return void 0;
        }