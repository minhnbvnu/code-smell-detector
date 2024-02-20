function getEntryForObjectLiteralMethodCompletion(symbol, name, enclosingDeclaration, program, host, options, preferences, formatContext) {
            const isSnippet = preferences.includeCompletionsWithSnippetText || void 0;
            let insertText = name;
            const sourceFile = enclosingDeclaration.getSourceFile();
            const method = createObjectLiteralMethod(symbol, enclosingDeclaration, sourceFile, program, host, preferences);
            if (!method) {
                return void 0;
            }
            const printer = createSnippetPrinter({
                removeComments: true,
                module: options.module,
                target: options.target,
                omitTrailingSemicolon: false,
                newLine: getNewLineKind(getNewLineOrDefaultFromHost(host, formatContext == null ? void 0 : formatContext.options))
            });
            if (formatContext) {
                insertText = printer.printAndFormatSnippetList(16 /* CommaDelimited */ | 64 /* AllowTrailingComma */, factory.createNodeArray([method], 
                /*hasTrailingComma*/
                true), sourceFile, formatContext);
            }
            else {
                insertText = printer.printSnippetList(16 /* CommaDelimited */ | 64 /* AllowTrailingComma */, factory.createNodeArray([method], 
                /*hasTrailingComma*/
                true), sourceFile);
            }
            const signaturePrinter = createPrinter({
                removeComments: true,
                module: options.module,
                target: options.target,
                omitTrailingSemicolon: true
            });
            const methodSignature = factory.createMethodSignature(
            /*modifiers*/
            void 0, 
            /*name*/
            "", method.questionToken, method.typeParameters, method.parameters, method.type);
            const labelDetails = { detail: signaturePrinter.printNode(4 /* Unspecified */, methodSignature, sourceFile) };
            return { isSnippet, insertText, labelDetails };
        }