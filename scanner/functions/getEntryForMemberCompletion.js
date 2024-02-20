function getEntryForMemberCompletion(host, program, options, preferences, name, symbol, location, position, contextToken, formatContext) {
            const classLikeDeclaration = findAncestor(location, isClassLike);
            if (!classLikeDeclaration) {
                return { insertText: name };
            }
            let isSnippet;
            let replacementSpan;
            let insertText = name;
            const checker = program.getTypeChecker();
            const sourceFile = location.getSourceFile();
            const printer = createSnippetPrinter({
                removeComments: true,
                module: options.module,
                target: options.target,
                omitTrailingSemicolon: false,
                newLine: getNewLineKind(getNewLineOrDefaultFromHost(host, formatContext == null ? void 0 : formatContext.options))
            });
            const importAdder = ts_codefix_exports.createImportAdder(sourceFile, program, preferences, host);
            let body;
            if (preferences.includeCompletionsWithSnippetText) {
                isSnippet = true;
                const emptyStmt = factory.createEmptyStatement();
                body = factory.createBlock([emptyStmt], 
                /* multiline */
                true);
                setSnippetElement(emptyStmt, { kind: 0 /* TabStop */, order: 0 });
            }
            else {
                body = factory.createBlock([], 
                /* multiline */
                true);
            }
            let modifiers = 0 /* None */;
            const { modifiers: presentModifiers, span: modifiersSpan } = getPresentModifiers(contextToken, sourceFile, position);
            const isAbstract = !!(presentModifiers & 256 /* Abstract */);
            const completionNodes = [];
            ts_codefix_exports.addNewNodeForMemberSymbol(symbol, classLikeDeclaration, sourceFile, { program, host }, preferences, importAdder, 
            // `addNewNodeForMemberSymbol` calls this callback function for each new member node
            // it adds for the given member symbol.
            // We store these member nodes in the `completionNodes` array.
            // Note: there might be:
            //  - No nodes if `addNewNodeForMemberSymbol` cannot figure out a node for the member;
            //  - One node;
            //  - More than one node if the member is overloaded (e.g. a method with overload signatures).
            (node) => {
                let requiredModifiers = 0 /* None */;
                if (isAbstract) {
                    requiredModifiers |= 256 /* Abstract */;
                }
                if (isClassElement(node) && checker.getMemberOverrideModifierStatus(classLikeDeclaration, node, symbol) === 1 /* NeedsOverride */) {
                    requiredModifiers |= 16384 /* Override */;
                }
                if (!completionNodes.length) {
                    modifiers = node.modifierFlagsCache | requiredModifiers | presentModifiers;
                }
                node = factory.updateModifiers(node, modifiers);
                completionNodes.push(node);
            }, body, ts_codefix_exports.PreserveOptionalFlags.Property, isAbstract);
            if (completionNodes.length) {
                const format = 1 /* MultiLine */ | 131072 /* NoTrailingNewLine */;
                replacementSpan = modifiersSpan;
                if (formatContext) {
                    insertText = printer.printAndFormatSnippetList(format, factory.createNodeArray(completionNodes), sourceFile, formatContext);
                }
                else {
                    insertText = printer.printSnippetList(format, factory.createNodeArray(completionNodes), sourceFile);
                }
            }
            return { insertText, isSnippet, importAdder, replacementSpan };
        }