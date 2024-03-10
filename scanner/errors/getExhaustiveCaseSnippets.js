function getExhaustiveCaseSnippets(caseBlock, sourceFile, preferences, options, host, program, formatContext) {
            const clauses = caseBlock.clauses;
            const checker = program.getTypeChecker();
            const switchType = checker.getTypeAtLocation(caseBlock.parent.expression);
            if (switchType && switchType.isUnion() && every(switchType.types, (type) => type.isLiteral())) {
                const tracker = newCaseClauseTracker(checker, clauses);
                const target = getEmitScriptTarget(options);
                const quotePreference = getQuotePreference(sourceFile, preferences);
                const importAdder = ts_codefix_exports.createImportAdder(sourceFile, program, preferences, host);
                const elements = [];
                for (const type of switchType.types) {
                    if (type.flags & 1024 /* EnumLiteral */) {
                        Debug.assert(type.symbol, "An enum member type should have a symbol");
                        Debug.assert(type.symbol.parent, "An enum member type should have a parent symbol (the enum symbol)");
                        const enumValue = type.symbol.valueDeclaration && checker.getConstantValue(type.symbol.valueDeclaration);
                        if (enumValue !== void 0) {
                            if (tracker.hasValue(enumValue)) {
                                continue;
                            }
                            tracker.addValue(enumValue);
                        }
                        const typeNode = ts_codefix_exports.typeToAutoImportableTypeNode(checker, importAdder, type, caseBlock, target);
                        if (!typeNode) {
                            return void 0;
                        }
                        const expr = typeNodeToExpression(typeNode, target, quotePreference);
                        if (!expr) {
                            return void 0;
                        }
                        elements.push(expr);
                    }
                    else if (!tracker.hasValue(type.value)) {
                        switch (typeof type.value) {
                            case "object":
                                elements.push(type.value.negative ? factory.createPrefixUnaryExpression(40 /* MinusToken */, factory.createBigIntLiteral({ negative: false, base10Value: type.value.base10Value })) : factory.createBigIntLiteral(type.value));
                                break;
                            case "number":
                                elements.push(type.value < 0 ? factory.createPrefixUnaryExpression(40 /* MinusToken */, factory.createNumericLiteral(-type.value)) : factory.createNumericLiteral(type.value));
                                break;
                            case "string":
                                elements.push(factory.createStringLiteral(type.value, quotePreference === 0 /* Single */));
                                break;
                        }
                    }
                }
                if (elements.length === 0) {
                    return void 0;
                }
                const newClauses = map(elements, (element) => factory.createCaseClause(element, []));
                const newLineChar = getNewLineOrDefaultFromHost(host, formatContext == null ? void 0 : formatContext.options);
                const printer = createSnippetPrinter({
                    removeComments: true,
                    module: options.module,
                    target: options.target,
                    newLine: getNewLineKind(newLineChar)
                });
                const printNode = formatContext ? (node) => printer.printAndFormatNode(4 /* Unspecified */, node, sourceFile, formatContext) : (node) => printer.printNode(4 /* Unspecified */, node, sourceFile);
                const insertText = map(newClauses, (clause, i) => {
                    if (preferences.includeCompletionsWithSnippetText) {
                        return `${printNode(clause)}$${i + 1}`;
                    }
                    return `${printNode(clause)}`;
                }).join(newLineChar);
                const firstClause = printer.printNode(4 /* Unspecified */, newClauses[0], sourceFile);
                return {
                    entry: {
                        name: `${firstClause} ...`,
                        kind: "" /* unknown */,
                        sortText: SortText.GlobalsOrKeywords,
                        insertText,
                        hasAction: importAdder.hasFixes() || void 0,
                        source: "SwitchCases/" /* SwitchCases */,
                        isSnippet: preferences.includeCompletionsWithSnippetText ? true : void 0
                    },
                    importAdder
                };
            }
            return void 0;
        }