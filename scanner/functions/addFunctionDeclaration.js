function addFunctionDeclaration(changes, context, info) {
            const quotePreference = getQuotePreference(context.sourceFile, context.preferences);
            const importAdder = createImportAdder(context.sourceFile, context.program, context.preferences, context.host);
            const functionDeclaration = info.kind === 2 /* Function */ ? createSignatureDeclarationFromCallExpression(259 /* FunctionDeclaration */, context, importAdder, info.call, idText(info.token), info.modifierFlags, info.parentDeclaration) : createSignatureDeclarationFromSignature(259 /* FunctionDeclaration */, context, quotePreference, info.signature, createStubbedBody(Diagnostics.Function_not_implemented.message, quotePreference), info.token, 
            /*modifiers*/
            void 0, 
            /*optional*/
            void 0, 
            /*enclosingDeclaration*/
            void 0, importAdder);
            if (functionDeclaration === void 0) {
                Debug.fail("fixMissingFunctionDeclaration codefix got unexpected error.");
            }
            isReturnStatement(info.parentDeclaration) ? changes.insertNodeBefore(info.sourceFile, info.parentDeclaration, functionDeclaration, 
            /*blankLineBetween*/
            true) : changes.insertNodeAtEndOfScope(info.sourceFile, info.parentDeclaration, functionDeclaration);
            importAdder.writeFixes(changes);
        }