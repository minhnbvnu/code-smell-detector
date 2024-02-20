function continuePreviousIncompleteResponse(cache, file, location, program, host, preferences, cancellationToken, position) {
            const previousResponse = cache.get();
            if (!previousResponse)
                return void 0;
            const touchNode = getTouchingPropertyName(file, position);
            const lowerCaseTokenText = location.text.toLowerCase();
            const exportMap = getExportInfoMap(file, host, program, preferences, cancellationToken);
            const newEntries = resolvingModuleSpecifiers("continuePreviousIncompleteResponse", host, ts_codefix_exports.createImportSpecifierResolver(file, program, host, preferences), program, location.getStart(), preferences, 
            /*isForImportStatementCompletion*/
            false, isValidTypeOnlyAliasUseSite(location), (context) => {
                const entries = mapDefined(previousResponse.entries, (entry) => {
                    var _a2;
                    if (!entry.hasAction || !entry.source || !entry.data || completionEntryDataIsResolved(entry.data)) {
                        return entry;
                    }
                    if (!charactersFuzzyMatchInString(entry.name, lowerCaseTokenText)) {
                        return void 0;
                    }
                    const { origin } = Debug.checkDefined(getAutoImportSymbolFromCompletionEntryData(entry.name, entry.data, program, host));
                    const info = exportMap.get(file.path, entry.data.exportMapKey);
                    const result = info && context.tryResolve(info, !isExternalModuleNameRelative(stripQuotes(origin.moduleSymbol.name)));
                    if (result === "skipped")
                        return entry;
                    if (!result || result === "failed") {
                        (_a2 = host.log) == null ? void 0 : _a2.call(host, `Unexpected failure resolving auto import for '${entry.name}' from '${entry.source}'`);
                        return void 0;
                    }
                    const newOrigin = {
                        ...origin,
                        kind: 32 /* ResolvedExport */,
                        moduleSpecifier: result.moduleSpecifier
                    };
                    entry.data = originToCompletionEntryData(newOrigin);
                    entry.source = getSourceFromOrigin(newOrigin);
                    entry.sourceDisplay = [textPart(newOrigin.moduleSpecifier)];
                    return entry;
                });
                if (!context.skippedAny()) {
                    previousResponse.isIncomplete = void 0;
                }
                return entries;
            });
            previousResponse.entries = newEntries;
            previousResponse.flags = (previousResponse.flags || 0) | 4 /* IsContinuation */;
            previousResponse.optionalReplacementSpan = getOptionalReplacementSpan(touchNode);
            return previousResponse;
        }