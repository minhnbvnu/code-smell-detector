function finishCatchOrFinallyTransform(node, transformer, tryStatement, possibleNameForVarDecl, continuationArgName) {
            const statements = [];
            let varDeclIdentifier;
            if (possibleNameForVarDecl && !shouldReturn(node, transformer)) {
                varDeclIdentifier = getSynthesizedDeepClone(declareSynthIdentifier(possibleNameForVarDecl));
                const typeArray = possibleNameForVarDecl.types;
                const unionType = transformer.checker.getUnionType(typeArray, 2 /* Subtype */);
                const unionTypeNode = transformer.isInJSFile ? void 0 : transformer.checker.typeToTypeNode(unionType, 
                /*enclosingDeclaration*/
                void 0, 
                /*flags*/
                void 0);
                const varDecl = [factory.createVariableDeclaration(varDeclIdentifier, 
                    /*exclamationToken*/
                    void 0, unionTypeNode)];
                const varDeclList = factory.createVariableStatement(
                /*modifiers*/
                void 0, factory.createVariableDeclarationList(varDecl, 1 /* Let */));
                statements.push(varDeclList);
            }
            statements.push(tryStatement);
            if (continuationArgName && varDeclIdentifier && isSynthBindingPattern(continuationArgName)) {
                statements.push(factory.createVariableStatement(
                /*modifiers*/
                void 0, factory.createVariableDeclarationList([
                    factory.createVariableDeclaration(getSynthesizedDeepClone(declareSynthBindingPattern(continuationArgName)), 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, varDeclIdentifier)
                ], 2 /* Const */)));
            }
            return statements;
        }