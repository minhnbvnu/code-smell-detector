function getCompletionEntryCodeActionsAndSourceDisplay(name, location, contextToken, origin, symbol, program, host, compilerOptions, sourceFile, position, previousToken, formatContext, preferences, data, source, cancellationToken) {
            if (data == null ? void 0 : data.moduleSpecifier) {
                if (previousToken && getImportStatementCompletionInfo(contextToken || previousToken).replacementSpan) {
                    return { codeActions: void 0, sourceDisplay: [textPart(data.moduleSpecifier)] };
                }
            }
            if (source === "ClassMemberSnippet/" /* ClassMemberSnippet */) {
                const { importAdder } = getEntryForMemberCompletion(host, program, compilerOptions, preferences, name, symbol, location, position, contextToken, formatContext);
                if (importAdder) {
                    const changes = ts_textChanges_exports.ChangeTracker.with({ host, formatContext, preferences }, importAdder.writeFixes);
                    return {
                        sourceDisplay: void 0,
                        codeActions: [{
                                changes,
                                description: diagnosticToString([Diagnostics.Includes_imports_of_types_referenced_by_0, name])
                            }]
                    };
                }
            }
            if (originIsTypeOnlyAlias(origin)) {
                const codeAction2 = ts_codefix_exports.getPromoteTypeOnlyCompletionAction(sourceFile, origin.declaration.name, program, host, formatContext, preferences);
                Debug.assertIsDefined(codeAction2, "Expected to have a code action for promoting type-only alias");
                return { codeActions: [codeAction2], sourceDisplay: void 0 };
            }
            if (!origin || !(originIsExport(origin) || originIsResolvedExport(origin))) {
                return { codeActions: void 0, sourceDisplay: void 0 };
            }
            const checker = origin.isFromPackageJson ? host.getPackageJsonAutoImportProvider().getTypeChecker() : program.getTypeChecker();
            const { moduleSymbol } = origin;
            const targetSymbol = checker.getMergedSymbol(skipAlias(symbol.exportSymbol || symbol, checker));
            const isJsxOpeningTagName = (contextToken == null ? void 0 : contextToken.kind) === 29 /* LessThanToken */ && isJsxOpeningLikeElement(contextToken.parent);
            const { moduleSpecifier, codeAction } = ts_codefix_exports.getImportCompletionAction(targetSymbol, moduleSymbol, data == null ? void 0 : data.exportMapKey, sourceFile, name, isJsxOpeningTagName, host, program, formatContext, previousToken && isIdentifier(previousToken) ? previousToken.getStart(sourceFile) : position, preferences, cancellationToken);
            Debug.assert(!(data == null ? void 0 : data.moduleSpecifier) || moduleSpecifier === data.moduleSpecifier);
            return { sourceDisplay: [textPart(moduleSpecifier)], codeActions: [codeAction] };
        }