function getCodeFixesForImportDeclaration(context, node) {
            const sourceFile = getSourceFileOfNode(node);
            const namespace = getNamespaceDeclarationNode(node);
            const opts = context.program.getCompilerOptions();
            const variations = [];
            variations.push(createAction(context, sourceFile, node, makeImport(namespace.name, 
            /*namedImports*/
            void 0, node.moduleSpecifier, getQuotePreference(sourceFile, context.preferences))));
            if (getEmitModuleKind(opts) === 1 /* CommonJS */) {
                variations.push(createAction(context, sourceFile, node, factory.createImportEqualsDeclaration(
                /*modifiers*/
                void 0, 
                /*isTypeOnly*/
                false, namespace.name, factory.createExternalModuleReference(node.moduleSpecifier))));
            }
            return variations;
        }