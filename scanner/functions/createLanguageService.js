function createLanguageService(host, documentRegistry = createDocumentRegistry(host.useCaseSensitiveFileNames && host.useCaseSensitiveFileNames(), host.getCurrentDirectory()), syntaxOnlyOrLanguageServiceMode) {
            var _a2;
            let languageServiceMode;
            if (syntaxOnlyOrLanguageServiceMode === void 0) {
                languageServiceMode = 0 /* Semantic */;
            }
            else if (typeof syntaxOnlyOrLanguageServiceMode === "boolean") {
                languageServiceMode = syntaxOnlyOrLanguageServiceMode ? 2 /* Syntactic */ : 0 /* Semantic */;
            }
            else {
                languageServiceMode = syntaxOnlyOrLanguageServiceMode;
            }
            const syntaxTreeCache = new SyntaxTreeCache(host);
            let program;
            let lastProjectVersion;
            let lastTypesRootVersion = 0;
            const cancellationToken = host.getCancellationToken ? new CancellationTokenObject(host.getCancellationToken()) : NoopCancellationToken;
            const currentDirectory = host.getCurrentDirectory();
            maybeSetLocalizedDiagnosticMessages((_a2 = host.getLocalizedDiagnosticMessages) == null ? void 0 : _a2.bind(host));
            function log(message) {
                if (host.log) {
                    host.log(message);
                }
            }
            const useCaseSensitiveFileNames = hostUsesCaseSensitiveFileNames(host);
            const getCanonicalFileName = createGetCanonicalFileName(useCaseSensitiveFileNames);
            const sourceMapper = getSourceMapper({
                useCaseSensitiveFileNames: () => useCaseSensitiveFileNames,
                getCurrentDirectory: () => currentDirectory,
                getProgram,
                fileExists: maybeBind(host, host.fileExists),
                readFile: maybeBind(host, host.readFile),
                getDocumentPositionMapper: maybeBind(host, host.getDocumentPositionMapper),
                getSourceFileLike: maybeBind(host, host.getSourceFileLike),
                log
            });
            function getValidSourceFile(fileName) {
                const sourceFile = program.getSourceFile(fileName);
                if (!sourceFile) {
                    const error = new Error(`Could not find source file: '${fileName}'.`);
                    error.ProgramFiles = program.getSourceFiles().map((f) => f.fileName);
                    throw error;
                }
                return sourceFile;
            }
            function synchronizeHostData() {
                var _a3, _b, _c;
                Debug.assert(languageServiceMode !== 2 /* Syntactic */);
                if (host.getProjectVersion) {
                    const hostProjectVersion = host.getProjectVersion();
                    if (hostProjectVersion) {
                        if (lastProjectVersion === hostProjectVersion && !((_a3 = host.hasChangedAutomaticTypeDirectiveNames) == null ? void 0 : _a3.call(host))) {
                            return;
                        }
                        lastProjectVersion = hostProjectVersion;
                    }
                }
                const typeRootsVersion = host.getTypeRootsVersion ? host.getTypeRootsVersion() : 0;
                if (lastTypesRootVersion !== typeRootsVersion) {
                    log("TypeRoots version has changed; provide new program");
                    program = void 0;
                    lastTypesRootVersion = typeRootsVersion;
                }
                const rootFileNames = host.getScriptFileNames().slice();
                const newSettings = host.getCompilationSettings() || getDefaultCompilerOptions2();
                const hasInvalidatedResolutions = host.hasInvalidatedResolutions || returnFalse;
                const hasChangedAutomaticTypeDirectiveNames = maybeBind(host, host.hasChangedAutomaticTypeDirectiveNames);
                const projectReferences = (_b = host.getProjectReferences) == null ? void 0 : _b.call(host);
                let parsedCommandLines;
                let compilerHost = {
                    getSourceFile: getOrCreateSourceFile,
                    getSourceFileByPath: getOrCreateSourceFileByPath,
                    getCancellationToken: () => cancellationToken,
                    getCanonicalFileName,
                    useCaseSensitiveFileNames: () => useCaseSensitiveFileNames,
                    getNewLine: () => getNewLineCharacter(newSettings),
                    getDefaultLibFileName: (options2) => host.getDefaultLibFileName(options2),
                    writeFile: noop,
                    getCurrentDirectory: () => currentDirectory,
                    fileExists: (fileName) => host.fileExists(fileName),
                    readFile: (fileName) => host.readFile && host.readFile(fileName),
                    getSymlinkCache: maybeBind(host, host.getSymlinkCache),
                    realpath: maybeBind(host, host.realpath),
                    directoryExists: (directoryName) => {
                        return directoryProbablyExists(directoryName, host);
                    },
                    getDirectories: (path) => {
                        return host.getDirectories ? host.getDirectories(path) : [];
                    },
                    readDirectory: (path, extensions, exclude, include, depth) => {
                        Debug.checkDefined(host.readDirectory, "'LanguageServiceHost.readDirectory' must be implemented to correctly process 'projectReferences'");
                        return host.readDirectory(path, extensions, exclude, include, depth);
                    },
                    onReleaseOldSourceFile,
                    onReleaseParsedCommandLine,
                    hasInvalidatedResolutions,
                    hasChangedAutomaticTypeDirectiveNames,
                    trace: maybeBind(host, host.trace),
                    resolveModuleNames: maybeBind(host, host.resolveModuleNames),
                    getModuleResolutionCache: maybeBind(host, host.getModuleResolutionCache),
                    createHash: maybeBind(host, host.createHash),
                    resolveTypeReferenceDirectives: maybeBind(host, host.resolveTypeReferenceDirectives),
                    resolveModuleNameLiterals: maybeBind(host, host.resolveModuleNameLiterals),
                    resolveTypeReferenceDirectiveReferences: maybeBind(host, host.resolveTypeReferenceDirectiveReferences),
                    useSourceOfProjectReferenceRedirect: maybeBind(host, host.useSourceOfProjectReferenceRedirect),
                    getParsedCommandLine
                };
                const originalGetSourceFile = compilerHost.getSourceFile;
                const { getSourceFileWithCache } = changeCompilerHostLikeToUseCache(compilerHost, (fileName) => toPath(fileName, currentDirectory, getCanonicalFileName), (...args) => originalGetSourceFile.call(compilerHost, ...args));
                compilerHost.getSourceFile = getSourceFileWithCache;
                (_c = host.setCompilerHost) == null ? void 0 : _c.call(host, compilerHost);
                const parseConfigHost = {
                    useCaseSensitiveFileNames,
                    fileExists: (fileName) => compilerHost.fileExists(fileName),
                    readFile: (fileName) => compilerHost.readFile(fileName),
                    readDirectory: (...args) => compilerHost.readDirectory(...args),
                    trace: compilerHost.trace,
                    getCurrentDirectory: compilerHost.getCurrentDirectory,
                    onUnRecoverableConfigFileDiagnostic: noop
                };
                const documentRegistryBucketKey = documentRegistry.getKeyForCompilationSettings(newSettings);
                if (isProgramUptoDate(program, rootFileNames, newSettings, (_path, fileName) => host.getScriptVersion(fileName), (fileName) => compilerHost.fileExists(fileName), hasInvalidatedResolutions, hasChangedAutomaticTypeDirectiveNames, getParsedCommandLine, projectReferences)) {
                    return;
                }
                const options = {
                    rootNames: rootFileNames,
                    options: newSettings,
                    host: compilerHost,
                    oldProgram: program,
                    projectReferences
                };
                program = createProgram(options);
                compilerHost = void 0;
                parsedCommandLines = void 0;
                sourceMapper.clearCache();
                program.getTypeChecker();
                return;
                function getParsedCommandLine(fileName) {
                    const path = toPath(fileName, currentDirectory, getCanonicalFileName);
                    const existing = parsedCommandLines == null ? void 0 : parsedCommandLines.get(path);
                    if (existing !== void 0)
                        return existing || void 0;
                    const result = host.getParsedCommandLine ? host.getParsedCommandLine(fileName) : getParsedCommandLineOfConfigFileUsingSourceFile(fileName);
                    (parsedCommandLines || (parsedCommandLines = /* @__PURE__ */ new Map())).set(path, result || false);
                    return result;
                }
                function getParsedCommandLineOfConfigFileUsingSourceFile(configFileName) {
                    const result = getOrCreateSourceFile(configFileName, 100 /* JSON */);
                    if (!result)
                        return void 0;
                    result.path = toPath(configFileName, currentDirectory, getCanonicalFileName);
                    result.resolvedPath = result.path;
                    result.originalFileName = result.fileName;
                    return parseJsonSourceFileConfigFileContent(result, parseConfigHost, getNormalizedAbsolutePath(getDirectoryPath(configFileName), currentDirectory), 
                    /*optionsToExtend*/
                    void 0, getNormalizedAbsolutePath(configFileName, currentDirectory));
                }
                function onReleaseParsedCommandLine(configFileName, oldResolvedRef, oldOptions) {
                    var _a4;
                    if (host.getParsedCommandLine) {
                        (_a4 = host.onReleaseParsedCommandLine) == null ? void 0 : _a4.call(host, configFileName, oldResolvedRef, oldOptions);
                    }
                    else if (oldResolvedRef) {
                        onReleaseOldSourceFile(oldResolvedRef.sourceFile, oldOptions);
                    }
                }
                function onReleaseOldSourceFile(oldSourceFile, oldOptions) {
                    const oldSettingsKey = documentRegistry.getKeyForCompilationSettings(oldOptions);
                    documentRegistry.releaseDocumentWithKey(oldSourceFile.resolvedPath, oldSettingsKey, oldSourceFile.scriptKind, oldSourceFile.impliedNodeFormat);
                }
                function getOrCreateSourceFile(fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile) {
                    return getOrCreateSourceFileByPath(fileName, toPath(fileName, currentDirectory, getCanonicalFileName), languageVersionOrOptions, onError, shouldCreateNewSourceFile);
                }
                function getOrCreateSourceFileByPath(fileName, path, languageVersionOrOptions, _onError, shouldCreateNewSourceFile) {
                    Debug.assert(compilerHost, "getOrCreateSourceFileByPath called after typical CompilerHost lifetime, check the callstack something with a reference to an old host.");
                    const scriptSnapshot = host.getScriptSnapshot(fileName);
                    if (!scriptSnapshot) {
                        return void 0;
                    }
                    const scriptKind = getScriptKind(fileName, host);
                    const scriptVersion = host.getScriptVersion(fileName);
                    if (!shouldCreateNewSourceFile) {
                        const oldSourceFile = program && program.getSourceFileByPath(path);
                        if (oldSourceFile) {
                            if (scriptKind === oldSourceFile.scriptKind) {
                                return documentRegistry.updateDocumentWithKey(fileName, path, host, documentRegistryBucketKey, scriptSnapshot, scriptVersion, scriptKind, languageVersionOrOptions);
                            }
                            else {
                                documentRegistry.releaseDocumentWithKey(oldSourceFile.resolvedPath, documentRegistry.getKeyForCompilationSettings(program.getCompilerOptions()), oldSourceFile.scriptKind, oldSourceFile.impliedNodeFormat);
                            }
                        }
                    }
                    return documentRegistry.acquireDocumentWithKey(fileName, path, host, documentRegistryBucketKey, scriptSnapshot, scriptVersion, scriptKind, languageVersionOrOptions);
                }
            }
            function getProgram() {
                if (languageServiceMode === 2 /* Syntactic */) {
                    Debug.assert(program === void 0);
                    return void 0;
                }
                synchronizeHostData();
                return program;
            }
            function getAutoImportProvider() {
                var _a3;
                return (_a3 = host.getPackageJsonAutoImportProvider) == null ? void 0 : _a3.call(host);
            }
            function updateIsDefinitionOfReferencedSymbols(referencedSymbols, knownSymbolSpans) {
                const checker = program.getTypeChecker();
                const symbol = getSymbolForProgram();
                if (!symbol)
                    return false;
                for (const referencedSymbol of referencedSymbols) {
                    for (const ref of referencedSymbol.references) {
                        const refNode = getNodeForSpan(ref);
                        Debug.assertIsDefined(refNode);
                        if (knownSymbolSpans.has(ref) || ts_FindAllReferences_exports.isDeclarationOfSymbol(refNode, symbol)) {
                            knownSymbolSpans.add(ref);
                            ref.isDefinition = true;
                            const mappedSpan = getMappedDocumentSpan(ref, sourceMapper, maybeBind(host, host.fileExists));
                            if (mappedSpan) {
                                knownSymbolSpans.add(mappedSpan);
                            }
                        }
                        else {
                            ref.isDefinition = false;
                        }
                    }
                }
                return true;
                function getSymbolForProgram() {
                    for (const referencedSymbol of referencedSymbols) {
                        for (const ref of referencedSymbol.references) {
                            if (knownSymbolSpans.has(ref)) {
                                const refNode = getNodeForSpan(ref);
                                Debug.assertIsDefined(refNode);
                                return checker.getSymbolAtLocation(refNode);
                            }
                            const mappedSpan = getMappedDocumentSpan(ref, sourceMapper, maybeBind(host, host.fileExists));
                            if (mappedSpan && knownSymbolSpans.has(mappedSpan)) {
                                const refNode = getNodeForSpan(mappedSpan);
                                if (refNode) {
                                    return checker.getSymbolAtLocation(refNode);
                                }
                            }
                        }
                    }
                    return void 0;
                }
                function getNodeForSpan(docSpan) {
                    const sourceFile = program.getSourceFile(docSpan.fileName);
                    if (!sourceFile)
                        return void 0;
                    const rawNode = getTouchingPropertyName(sourceFile, docSpan.textSpan.start);
                    const adjustedNode = ts_FindAllReferences_exports.Core.getAdjustedNode(rawNode, { use: ts_FindAllReferences_exports.FindReferencesUse.References });
                    return adjustedNode;
                }
            }
            function cleanupSemanticCache() {
                program = void 0;
            }
            function dispose() {
                if (program) {
                    const key = documentRegistry.getKeyForCompilationSettings(program.getCompilerOptions());
                    forEach(program.getSourceFiles(), (f) => documentRegistry.releaseDocumentWithKey(f.resolvedPath, key, f.scriptKind, f.impliedNodeFormat));
                    program = void 0;
                }
                host = void 0;
            }
            function getSyntacticDiagnostics(fileName) {
                synchronizeHostData();
                return program.getSyntacticDiagnostics(getValidSourceFile(fileName), cancellationToken).slice();
            }
            function getSemanticDiagnostics(fileName) {
                synchronizeHostData();
                const targetSourceFile = getValidSourceFile(fileName);
                const semanticDiagnostics = program.getSemanticDiagnostics(targetSourceFile, cancellationToken);
                if (!getEmitDeclarations(program.getCompilerOptions())) {
                    return semanticDiagnostics.slice();
                }
                const declarationDiagnostics = program.getDeclarationDiagnostics(targetSourceFile, cancellationToken);
                return [...semanticDiagnostics, ...declarationDiagnostics];
            }
            function getSuggestionDiagnostics(fileName) {
                synchronizeHostData();
                return computeSuggestionDiagnostics(getValidSourceFile(fileName), program, cancellationToken);
            }
            function getCompilerOptionsDiagnostics() {
                synchronizeHostData();
                return [...program.getOptionsDiagnostics(cancellationToken), ...program.getGlobalDiagnostics(cancellationToken)];
            }
            function getCompletionsAtPosition2(fileName, position, options = emptyOptions, formattingSettings) {
                const fullPreferences = {
                    ...identity(options),
                    // avoid excess property check
                    includeCompletionsForModuleExports: options.includeCompletionsForModuleExports || options.includeExternalModuleExports,
                    includeCompletionsWithInsertText: options.includeCompletionsWithInsertText || options.includeInsertTextCompletions
                };
                synchronizeHostData();
                return ts_Completions_exports.getCompletionsAtPosition(host, program, log, getValidSourceFile(fileName), position, fullPreferences, options.triggerCharacter, options.triggerKind, cancellationToken, formattingSettings && ts_formatting_exports.getFormatContext(formattingSettings, host), options.includeSymbol);
            }
            function getCompletionEntryDetails2(fileName, position, name, formattingOptions, source, preferences = emptyOptions, data) {
                synchronizeHostData();
                return ts_Completions_exports.getCompletionEntryDetails(program, log, getValidSourceFile(fileName), position, { name, source, data }, host, formattingOptions && ts_formatting_exports.getFormatContext(formattingOptions, host), 
                // TODO: GH#18217
                preferences, cancellationToken);
            }
            function getCompletionEntrySymbol2(fileName, position, name, source, preferences = emptyOptions) {
                synchronizeHostData();
                return ts_Completions_exports.getCompletionEntrySymbol(program, log, getValidSourceFile(fileName), position, { name, source }, host, preferences);
            }
            function getQuickInfoAtPosition(fileName, position) {
                synchronizeHostData();
                const sourceFile = getValidSourceFile(fileName);
                const node = getTouchingPropertyName(sourceFile, position);
                if (node === sourceFile) {
                    return void 0;
                }
                const typeChecker = program.getTypeChecker();
                const nodeForQuickInfo = getNodeForQuickInfo(node);
                const symbol = getSymbolAtLocationForQuickInfo(nodeForQuickInfo, typeChecker);
                if (!symbol || typeChecker.isUnknownSymbol(symbol)) {
                    const type = shouldGetType(sourceFile, nodeForQuickInfo, position) ? typeChecker.getTypeAtLocation(nodeForQuickInfo) : void 0;
                    return type && {
                        kind: "" /* unknown */,
                        kindModifiers: "" /* none */,
                        textSpan: createTextSpanFromNode(nodeForQuickInfo, sourceFile),
                        displayParts: typeChecker.runWithCancellationToken(cancellationToken, (typeChecker2) => typeToDisplayParts(typeChecker2, type, getContainerNode(nodeForQuickInfo))),
                        documentation: type.symbol ? type.symbol.getDocumentationComment(typeChecker) : void 0,
                        tags: type.symbol ? type.symbol.getJsDocTags(typeChecker) : void 0
                    };
                }
                const { symbolKind, displayParts, documentation, tags } = typeChecker.runWithCancellationToken(cancellationToken, (typeChecker2) => ts_SymbolDisplay_exports.getSymbolDisplayPartsDocumentationAndSymbolKind(typeChecker2, symbol, sourceFile, getContainerNode(nodeForQuickInfo), nodeForQuickInfo));
                return {
                    kind: symbolKind,
                    kindModifiers: ts_SymbolDisplay_exports.getSymbolModifiers(typeChecker, symbol),
                    textSpan: createTextSpanFromNode(nodeForQuickInfo, sourceFile),
                    displayParts,
                    documentation,
                    tags
                };
            }
            function getNodeForQuickInfo(node) {
                if (isNewExpression(node.parent) && node.pos === node.parent.pos) {
                    return node.parent.expression;
                }
                if (isNamedTupleMember(node.parent) && node.pos === node.parent.pos) {
                    return node.parent;
                }
                if (isImportMeta(node.parent) && node.parent.name === node) {
                    return node.parent;
                }
                return node;
            }
            function shouldGetType(sourceFile, node, position) {
                switch (node.kind) {
                    case 79 /* Identifier */:
                        return !isLabelName(node) && !isTagName(node) && !isConstTypeReference(node.parent);
                    case 208 /* PropertyAccessExpression */:
                    case 163 /* QualifiedName */:
                        return !isInComment(sourceFile, position);
                    case 108 /* ThisKeyword */:
                    case 194 /* ThisType */:
                    case 106 /* SuperKeyword */:
                    case 199 /* NamedTupleMember */:
                        return true;
                    case 233 /* MetaProperty */:
                        return isImportMeta(node);
                    default:
                        return false;
                }
            }
            function getDefinitionAtPosition2(fileName, position, searchOtherFilesOnly, stopAtAlias) {
                synchronizeHostData();
                return ts_GoToDefinition_exports.getDefinitionAtPosition(program, getValidSourceFile(fileName), position, searchOtherFilesOnly, stopAtAlias);
            }
            function getDefinitionAndBoundSpan2(fileName, position) {
                synchronizeHostData();
                return ts_GoToDefinition_exports.getDefinitionAndBoundSpan(program, getValidSourceFile(fileName), position);
            }
            function getTypeDefinitionAtPosition2(fileName, position) {
                synchronizeHostData();
                return ts_GoToDefinition_exports.getTypeDefinitionAtPosition(program.getTypeChecker(), getValidSourceFile(fileName), position);
            }
            function getImplementationAtPosition(fileName, position) {
                synchronizeHostData();
                return ts_FindAllReferences_exports.getImplementationsAtPosition(program, cancellationToken, program.getSourceFiles(), getValidSourceFile(fileName), position);
            }
            function getOccurrencesAtPosition(fileName, position) {
                return flatMap(getDocumentHighlights(fileName, position, [fileName]), (entry) => entry.highlightSpans.map((highlightSpan) => ({
                    fileName: entry.fileName,
                    textSpan: highlightSpan.textSpan,
                    isWriteAccess: highlightSpan.kind === "writtenReference" /* writtenReference */,
                    ...highlightSpan.isInString && { isInString: true },
                    ...highlightSpan.contextSpan && { contextSpan: highlightSpan.contextSpan }
                })));
            }
            function getDocumentHighlights(fileName, position, filesToSearch) {
                const normalizedFileName = normalizePath(fileName);
                Debug.assert(filesToSearch.some((f) => normalizePath(f) === normalizedFileName));
                synchronizeHostData();
                const sourceFilesToSearch = mapDefined(filesToSearch, (fileName2) => program.getSourceFile(fileName2));
                const sourceFile = getValidSourceFile(fileName);
                return DocumentHighlights.getDocumentHighlights(program, cancellationToken, sourceFile, position, sourceFilesToSearch);
            }
            function findRenameLocations(fileName, position, findInStrings, findInComments, providePrefixAndSuffixTextForRename) {
                synchronizeHostData();
                const sourceFile = getValidSourceFile(fileName);
                const node = getAdjustedRenameLocation(getTouchingPropertyName(sourceFile, position));
                if (!ts_Rename_exports.nodeIsEligibleForRename(node))
                    return void 0;
                if (isIdentifier(node) && (isJsxOpeningElement(node.parent) || isJsxClosingElement(node.parent)) && isIntrinsicJsxName(node.escapedText)) {
                    const { openingElement, closingElement } = node.parent.parent;
                    return [openingElement, closingElement].map((node2) => {
                        const textSpan = createTextSpanFromNode(node2.tagName, sourceFile);
                        return {
                            fileName: sourceFile.fileName,
                            textSpan,
                            ...ts_FindAllReferences_exports.toContextSpan(textSpan, sourceFile, node2.parent)
                        };
                    });
                }
                else {
                    return getReferencesWorker(node, position, { findInStrings, findInComments, providePrefixAndSuffixTextForRename, use: ts_FindAllReferences_exports.FindReferencesUse.Rename }, (entry, originalNode, checker) => ts_FindAllReferences_exports.toRenameLocation(entry, originalNode, checker, providePrefixAndSuffixTextForRename || false));
                }
            }
            function getReferencesAtPosition(fileName, position) {
                synchronizeHostData();
                return getReferencesWorker(getTouchingPropertyName(getValidSourceFile(fileName), position), position, { use: ts_FindAllReferences_exports.FindReferencesUse.References }, ts_FindAllReferences_exports.toReferenceEntry);
            }
            function getReferencesWorker(node, position, options, cb) {
                synchronizeHostData();
                const sourceFiles = options && options.use === ts_FindAllReferences_exports.FindReferencesUse.Rename ? program.getSourceFiles().filter((sourceFile) => !program.isSourceFileDefaultLibrary(sourceFile)) : program.getSourceFiles();
                return ts_FindAllReferences_exports.findReferenceOrRenameEntries(program, cancellationToken, sourceFiles, node, position, options, cb);
            }
            function findReferences(fileName, position) {
                synchronizeHostData();
                return ts_FindAllReferences_exports.findReferencedSymbols(program, cancellationToken, program.getSourceFiles(), getValidSourceFile(fileName), position);
            }
            function getFileReferences(fileName) {
                synchronizeHostData();
                return ts_FindAllReferences_exports.Core.getReferencesForFileName(fileName, program, program.getSourceFiles()).map(ts_FindAllReferences_exports.toReferenceEntry);
            }
            function getNavigateToItems2(searchValue, maxResultCount, fileName, excludeDtsFiles = false) {
                synchronizeHostData();
                const sourceFiles = fileName ? [getValidSourceFile(fileName)] : program.getSourceFiles();
                return getNavigateToItems(sourceFiles, program.getTypeChecker(), cancellationToken, searchValue, maxResultCount, excludeDtsFiles);
            }
            function getEmitOutput(fileName, emitOnlyDtsFiles, forceDtsEmit) {
                synchronizeHostData();
                const sourceFile = getValidSourceFile(fileName);
                const customTransformers = host.getCustomTransformers && host.getCustomTransformers();
                return getFileEmitOutput(program, sourceFile, !!emitOnlyDtsFiles, cancellationToken, customTransformers, forceDtsEmit);
            }
            function getSignatureHelpItems2(fileName, position, { triggerReason } = emptyOptions) {
                synchronizeHostData();
                const sourceFile = getValidSourceFile(fileName);
                return ts_SignatureHelp_exports.getSignatureHelpItems(program, sourceFile, position, triggerReason, cancellationToken);
            }
            function getNonBoundSourceFile(fileName) {
                return syntaxTreeCache.getCurrentSourceFile(fileName);
            }
            function getNameOrDottedNameSpan(fileName, startPos, _endPos) {
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                const node = getTouchingPropertyName(sourceFile, startPos);
                if (node === sourceFile) {
                    return void 0;
                }
                switch (node.kind) {
                    case 208 /* PropertyAccessExpression */:
                    case 163 /* QualifiedName */:
                    case 10 /* StringLiteral */:
                    case 95 /* FalseKeyword */:
                    case 110 /* TrueKeyword */:
                    case 104 /* NullKeyword */:
                    case 106 /* SuperKeyword */:
                    case 108 /* ThisKeyword */:
                    case 194 /* ThisType */:
                    case 79 /* Identifier */:
                        break;
                    default:
                        return void 0;
                }
                let nodeForStartPos = node;
                while (true) {
                    if (isRightSideOfPropertyAccess(nodeForStartPos) || isRightSideOfQualifiedName(nodeForStartPos)) {
                        nodeForStartPos = nodeForStartPos.parent;
                    }
                    else if (isNameOfModuleDeclaration(nodeForStartPos)) {
                        if (nodeForStartPos.parent.parent.kind === 264 /* ModuleDeclaration */ && nodeForStartPos.parent.parent.body === nodeForStartPos.parent) {
                            nodeForStartPos = nodeForStartPos.parent.parent.name;
                        }
                        else {
                            break;
                        }
                    }
                    else {
                        break;
                    }
                }
                return createTextSpanFromBounds(nodeForStartPos.getStart(), node.getEnd());
            }
            function getBreakpointStatementAtPosition(fileName, position) {
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                return ts_BreakpointResolver_exports.spanInSourceFileAtLocation(sourceFile, position);
            }
            function getNavigationBarItems2(fileName) {
                return getNavigationBarItems(syntaxTreeCache.getCurrentSourceFile(fileName), cancellationToken);
            }
            function getNavigationTree2(fileName) {
                return getNavigationTree(syntaxTreeCache.getCurrentSourceFile(fileName), cancellationToken);
            }
            function getSemanticClassifications3(fileName, span, format) {
                synchronizeHostData();
                const responseFormat = format || "original" /* Original */;
                if (responseFormat === "2020" /* TwentyTwenty */) {
                    return ts_classifier_exports.v2020.getSemanticClassifications(program, cancellationToken, getValidSourceFile(fileName), span);
                }
                else {
                    return getSemanticClassifications(program.getTypeChecker(), cancellationToken, getValidSourceFile(fileName), program.getClassifiableNames(), span);
                }
            }
            function getEncodedSemanticClassifications3(fileName, span, format) {
                synchronizeHostData();
                const responseFormat = format || "original" /* Original */;
                if (responseFormat === "original" /* Original */) {
                    return getEncodedSemanticClassifications(program.getTypeChecker(), cancellationToken, getValidSourceFile(fileName), program.getClassifiableNames(), span);
                }
                else {
                    return ts_classifier_exports.v2020.getEncodedSemanticClassifications(program, cancellationToken, getValidSourceFile(fileName), span);
                }
            }
            function getSyntacticClassifications2(fileName, span) {
                return getSyntacticClassifications(cancellationToken, syntaxTreeCache.getCurrentSourceFile(fileName), span);
            }
            function getEncodedSyntacticClassifications2(fileName, span) {
                return getEncodedSyntacticClassifications(cancellationToken, syntaxTreeCache.getCurrentSourceFile(fileName), span);
            }
            function getOutliningSpans(fileName) {
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                return ts_OutliningElementsCollector_exports.collectElements(sourceFile, cancellationToken);
            }
            const braceMatching = new Map(Object.entries({
                [18 /* OpenBraceToken */]: 19 /* CloseBraceToken */,
                [20 /* OpenParenToken */]: 21 /* CloseParenToken */,
                [22 /* OpenBracketToken */]: 23 /* CloseBracketToken */,
                [31 /* GreaterThanToken */]: 29 /* LessThanToken */
            }));
            braceMatching.forEach((value, key) => braceMatching.set(value.toString(), Number(key)));
            function getBraceMatchingAtPosition(fileName, position) {
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                const token = getTouchingToken(sourceFile, position);
                const matchKind = token.getStart(sourceFile) === position ? braceMatching.get(token.kind.toString()) : void 0;
                const match = matchKind && findChildOfKind(token.parent, matchKind, sourceFile);
                return match ? [createTextSpanFromNode(token, sourceFile), createTextSpanFromNode(match, sourceFile)].sort((a, b) => a.start - b.start) : emptyArray;
            }
            function getIndentationAtPosition(fileName, position, editorOptions) {
                let start = timestamp();
                const settings = toEditorSettings(editorOptions);
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                log("getIndentationAtPosition: getCurrentSourceFile: " + (timestamp() - start));
                start = timestamp();
                const result = ts_formatting_exports.SmartIndenter.getIndentation(position, sourceFile, settings);
                log("getIndentationAtPosition: computeIndentation  : " + (timestamp() - start));
                return result;
            }
            function getFormattingEditsForRange(fileName, start, end, options) {
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                return ts_formatting_exports.formatSelection(start, end, sourceFile, ts_formatting_exports.getFormatContext(toEditorSettings(options), host));
            }
            function getFormattingEditsForDocument(fileName, options) {
                return ts_formatting_exports.formatDocument(syntaxTreeCache.getCurrentSourceFile(fileName), ts_formatting_exports.getFormatContext(toEditorSettings(options), host));
            }
            function getFormattingEditsAfterKeystroke(fileName, position, key, options) {
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                const formatContext = ts_formatting_exports.getFormatContext(toEditorSettings(options), host);
                if (!isInComment(sourceFile, position)) {
                    switch (key) {
                        case "{":
                            return ts_formatting_exports.formatOnOpeningCurly(position, sourceFile, formatContext);
                        case "}":
                            return ts_formatting_exports.formatOnClosingCurly(position, sourceFile, formatContext);
                        case ";":
                            return ts_formatting_exports.formatOnSemicolon(position, sourceFile, formatContext);
                        case "\n":
                            return ts_formatting_exports.formatOnEnter(position, sourceFile, formatContext);
                    }
                }
                return [];
            }
            function getCodeFixesAtPosition(fileName, start, end, errorCodes63, formatOptions, preferences = emptyOptions) {
                synchronizeHostData();
                const sourceFile = getValidSourceFile(fileName);
                const span = createTextSpanFromBounds(start, end);
                const formatContext = ts_formatting_exports.getFormatContext(formatOptions, host);
                return flatMap(deduplicate(errorCodes63, equateValues, compareValues), (errorCode) => {
                    cancellationToken.throwIfCancellationRequested();
                    return ts_codefix_exports.getFixes({ errorCode, sourceFile, span, program, host, cancellationToken, formatContext, preferences });
                });
            }
            function getCombinedCodeFix(scope, fixId51, formatOptions, preferences = emptyOptions) {
                synchronizeHostData();
                Debug.assert(scope.type === "file");
                const sourceFile = getValidSourceFile(scope.fileName);
                const formatContext = ts_formatting_exports.getFormatContext(formatOptions, host);
                return ts_codefix_exports.getAllFixes({ fixId: fixId51, sourceFile, program, host, cancellationToken, formatContext, preferences });
            }
            function organizeImports2(args, formatOptions, preferences = emptyOptions) {
                var _a3;
                synchronizeHostData();
                Debug.assert(args.type === "file");
                const sourceFile = getValidSourceFile(args.fileName);
                const formatContext = ts_formatting_exports.getFormatContext(formatOptions, host);
                const mode = (_a3 = args.mode) != null ? _a3 : args.skipDestructiveCodeActions ? "SortAndCombine" /* SortAndCombine */ : "All" /* All */;
                return ts_OrganizeImports_exports.organizeImports(sourceFile, formatContext, host, program, preferences, mode);
            }
            function getEditsForFileRename2(oldFilePath, newFilePath, formatOptions, preferences = emptyOptions) {
                return getEditsForFileRename(getProgram(), oldFilePath, newFilePath, host, ts_formatting_exports.getFormatContext(formatOptions, host), preferences, sourceMapper);
            }
            function applyCodeActionCommand(fileName, actionOrFormatSettingsOrUndefined) {
                const action = typeof fileName === "string" ? actionOrFormatSettingsOrUndefined : fileName;
                return isArray(action) ? Promise.all(action.map((a) => applySingleCodeActionCommand(a))) : applySingleCodeActionCommand(action);
            }
            function applySingleCodeActionCommand(action) {
                const getPath = (path) => toPath(path, currentDirectory, getCanonicalFileName);
                Debug.assertEqual(action.type, "install package");
                return host.installPackage ? host.installPackage({ fileName: getPath(action.file), packageName: action.packageName }) : Promise.reject("Host does not implement `installPackage`");
            }
            function getDocCommentTemplateAtPosition2(fileName, position, options, formatOptions) {
                const formatSettings = formatOptions ? ts_formatting_exports.getFormatContext(formatOptions, host).options : void 0;
                return ts_JsDoc_exports.getDocCommentTemplateAtPosition(getNewLineOrDefaultFromHost(host, formatSettings), syntaxTreeCache.getCurrentSourceFile(fileName), position, options);
            }
            function isValidBraceCompletionAtPosition(fileName, position, openingBrace) {
                if (openingBrace === 60 /* lessThan */) {
                    return false;
                }
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                if (isInString(sourceFile, position)) {
                    return false;
                }
                if (isInsideJsxElementOrAttribute(sourceFile, position)) {
                    return openingBrace === 123 /* openBrace */;
                }
                if (isInTemplateString(sourceFile, position)) {
                    return false;
                }
                switch (openingBrace) {
                    case 39 /* singleQuote */:
                    case 34 /* doubleQuote */:
                    case 96 /* backtick */:
                        return !isInComment(sourceFile, position);
                }
                return true;
            }
            function getJsxClosingTagAtPosition(fileName, position) {
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                const token = findPrecedingToken(position, sourceFile);
                if (!token)
                    return void 0;
                const element = token.kind === 31 /* GreaterThanToken */ && isJsxOpeningElement(token.parent) ? token.parent.parent : isJsxText(token) && isJsxElement(token.parent) ? token.parent : void 0;
                if (element && isUnclosedTag(element)) {
                    return { newText: `</${element.openingElement.tagName.getText(sourceFile)}>` };
                }
                const fragment = token.kind === 31 /* GreaterThanToken */ && isJsxOpeningFragment(token.parent) ? token.parent.parent : isJsxText(token) && isJsxFragment(token.parent) ? token.parent : void 0;
                if (fragment && isUnclosedFragment(fragment)) {
                    return { newText: "</>" };
                }
            }
            function getLinesForRange(sourceFile, textRange) {
                return {
                    lineStarts: sourceFile.getLineStarts(),
                    firstLine: sourceFile.getLineAndCharacterOfPosition(textRange.pos).line,
                    lastLine: sourceFile.getLineAndCharacterOfPosition(textRange.end).line
                };
            }
            function toggleLineComment(fileName, textRange, insertComment) {
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                const textChanges2 = [];
                const { lineStarts, firstLine, lastLine } = getLinesForRange(sourceFile, textRange);
                let isCommenting = insertComment || false;
                let leftMostPosition = Number.MAX_VALUE;
                const lineTextStarts = /* @__PURE__ */ new Map();
                const firstNonWhitespaceCharacterRegex = new RegExp(/\S/);
                const isJsx = isInsideJsxElement(sourceFile, lineStarts[firstLine]);
                const openComment = isJsx ? "{/*" : "//";
                for (let i = firstLine; i <= lastLine; i++) {
                    const lineText = sourceFile.text.substring(lineStarts[i], sourceFile.getLineEndOfPosition(lineStarts[i]));
                    const regExec = firstNonWhitespaceCharacterRegex.exec(lineText);
                    if (regExec) {
                        leftMostPosition = Math.min(leftMostPosition, regExec.index);
                        lineTextStarts.set(i.toString(), regExec.index);
                        if (lineText.substr(regExec.index, openComment.length) !== openComment) {
                            isCommenting = insertComment === void 0 || insertComment;
                        }
                    }
                }
                for (let i = firstLine; i <= lastLine; i++) {
                    if (firstLine !== lastLine && lineStarts[i] === textRange.end) {
                        continue;
                    }
                    const lineTextStart = lineTextStarts.get(i.toString());
                    if (lineTextStart !== void 0) {
                        if (isJsx) {
                            textChanges2.push.apply(textChanges2, toggleMultilineComment(fileName, { pos: lineStarts[i] + leftMostPosition, end: sourceFile.getLineEndOfPosition(lineStarts[i]) }, isCommenting, isJsx));
                        }
                        else if (isCommenting) {
                            textChanges2.push({
                                newText: openComment,
                                span: {
                                    length: 0,
                                    start: lineStarts[i] + leftMostPosition
                                }
                            });
                        }
                        else if (sourceFile.text.substr(lineStarts[i] + lineTextStart, openComment.length) === openComment) {
                            textChanges2.push({
                                newText: "",
                                span: {
                                    length: openComment.length,
                                    start: lineStarts[i] + lineTextStart
                                }
                            });
                        }
                    }
                }
                return textChanges2;
            }
            function toggleMultilineComment(fileName, textRange, insertComment, isInsideJsx) {
                var _a3;
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                const textChanges2 = [];
                const { text } = sourceFile;
                let hasComment = false;
                let isCommenting = insertComment || false;
                const positions = [];
                let { pos } = textRange;
                const isJsx = isInsideJsx !== void 0 ? isInsideJsx : isInsideJsxElement(sourceFile, pos);
                const openMultiline = isJsx ? "{/*" : "/*";
                const closeMultiline = isJsx ? "*/}" : "*/";
                const openMultilineRegex = isJsx ? "\\{\\/\\*" : "\\/\\*";
                const closeMultilineRegex = isJsx ? "\\*\\/\\}" : "\\*\\/";
                while (pos <= textRange.end) {
                    const offset = text.substr(pos, openMultiline.length) === openMultiline ? openMultiline.length : 0;
                    const commentRange = isInComment(sourceFile, pos + offset);
                    if (commentRange) {
                        if (isJsx) {
                            commentRange.pos--;
                            commentRange.end++;
                        }
                        positions.push(commentRange.pos);
                        if (commentRange.kind === 3 /* MultiLineCommentTrivia */) {
                            positions.push(commentRange.end);
                        }
                        hasComment = true;
                        pos = commentRange.end + 1;
                    }
                    else {
                        const newPos = text.substring(pos, textRange.end).search(`(${openMultilineRegex})|(${closeMultilineRegex})`);
                        isCommenting = insertComment !== void 0 ? insertComment : isCommenting || !isTextWhiteSpaceLike(text, pos, newPos === -1 ? textRange.end : pos + newPos);
                        pos = newPos === -1 ? textRange.end + 1 : pos + newPos + closeMultiline.length;
                    }
                }
                if (isCommenting || !hasComment) {
                    if (((_a3 = isInComment(sourceFile, textRange.pos)) == null ? void 0 : _a3.kind) !== 2 /* SingleLineCommentTrivia */) {
                        insertSorted(positions, textRange.pos, compareValues);
                    }
                    insertSorted(positions, textRange.end, compareValues);
                    const firstPos = positions[0];
                    if (text.substr(firstPos, openMultiline.length) !== openMultiline) {
                        textChanges2.push({
                            newText: openMultiline,
                            span: {
                                length: 0,
                                start: firstPos
                            }
                        });
                    }
                    for (let i = 1; i < positions.length - 1; i++) {
                        if (text.substr(positions[i] - closeMultiline.length, closeMultiline.length) !== closeMultiline) {
                            textChanges2.push({
                                newText: closeMultiline,
                                span: {
                                    length: 0,
                                    start: positions[i]
                                }
                            });
                        }
                        if (text.substr(positions[i], openMultiline.length) !== openMultiline) {
                            textChanges2.push({
                                newText: openMultiline,
                                span: {
                                    length: 0,
                                    start: positions[i]
                                }
                            });
                        }
                    }
                    if (textChanges2.length % 2 !== 0) {
                        textChanges2.push({
                            newText: closeMultiline,
                            span: {
                                length: 0,
                                start: positions[positions.length - 1]
                            }
                        });
                    }
                }
                else {
                    for (const pos2 of positions) {
                        const from = pos2 - closeMultiline.length > 0 ? pos2 - closeMultiline.length : 0;
                        const offset = text.substr(from, closeMultiline.length) === closeMultiline ? closeMultiline.length : 0;
                        textChanges2.push({
                            newText: "",
                            span: {
                                length: openMultiline.length,
                                start: pos2 - offset
                            }
                        });
                    }
                }
                return textChanges2;
            }
            function commentSelection(fileName, textRange) {
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                const { firstLine, lastLine } = getLinesForRange(sourceFile, textRange);
                return firstLine === lastLine && textRange.pos !== textRange.end ? toggleMultilineComment(fileName, textRange, 
                /*insertComment*/
                true) : toggleLineComment(fileName, textRange, 
                /*insertComment*/
                true);
            }
            function uncommentSelection(fileName, textRange) {
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                const textChanges2 = [];
                const { pos } = textRange;
                let { end } = textRange;
                if (pos === end) {
                    end += isInsideJsxElement(sourceFile, pos) ? 2 : 1;
                }
                for (let i = pos; i <= end; i++) {
                    const commentRange = isInComment(sourceFile, i);
                    if (commentRange) {
                        switch (commentRange.kind) {
                            case 2 /* SingleLineCommentTrivia */:
                                textChanges2.push.apply(textChanges2, toggleLineComment(fileName, { end: commentRange.end, pos: commentRange.pos + 1 }, 
                                /*insertComment*/
                                false));
                                break;
                            case 3 /* MultiLineCommentTrivia */:
                                textChanges2.push.apply(textChanges2, toggleMultilineComment(fileName, { end: commentRange.end, pos: commentRange.pos + 1 }, 
                                /*insertComment*/
                                false));
                        }
                        i = commentRange.end + 1;
                    }
                }
                return textChanges2;
            }
            function isUnclosedTag({ openingElement, closingElement, parent: parent2 }) {
                return !tagNamesAreEquivalent(openingElement.tagName, closingElement.tagName) || isJsxElement(parent2) && tagNamesAreEquivalent(openingElement.tagName, parent2.openingElement.tagName) && isUnclosedTag(parent2);
            }
            function isUnclosedFragment({ closingFragment, parent: parent2 }) {
                return !!(closingFragment.flags & 131072 /* ThisNodeHasError */) || isJsxFragment(parent2) && isUnclosedFragment(parent2);
            }
            function getSpanOfEnclosingComment(fileName, position, onlyMultiLine) {
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                const range = ts_formatting_exports.getRangeOfEnclosingComment(sourceFile, position);
                return range && (!onlyMultiLine || range.kind === 3 /* MultiLineCommentTrivia */) ? createTextSpanFromRange(range) : void 0;
            }
            function getTodoComments(fileName, descriptors) {
                synchronizeHostData();
                const sourceFile = getValidSourceFile(fileName);
                cancellationToken.throwIfCancellationRequested();
                const fileContents = sourceFile.text;
                const result = [];
                if (descriptors.length > 0 && !isNodeModulesFile(sourceFile.fileName)) {
                    const regExp = getTodoCommentsRegExp();
                    let matchArray;
                    while (matchArray = regExp.exec(fileContents)) {
                        cancellationToken.throwIfCancellationRequested();
                        const firstDescriptorCaptureIndex = 3;
                        Debug.assert(matchArray.length === descriptors.length + firstDescriptorCaptureIndex);
                        const preamble = matchArray[1];
                        const matchPosition = matchArray.index + preamble.length;
                        if (!isInComment(sourceFile, matchPosition)) {
                            continue;
                        }
                        let descriptor;
                        for (let i = 0; i < descriptors.length; i++) {
                            if (matchArray[i + firstDescriptorCaptureIndex]) {
                                descriptor = descriptors[i];
                            }
                        }
                        if (descriptor === void 0)
                            return Debug.fail();
                        if (isLetterOrDigit(fileContents.charCodeAt(matchPosition + descriptor.text.length))) {
                            continue;
                        }
                        const message = matchArray[2];
                        result.push({ descriptor, message, position: matchPosition });
                    }
                }
                return result;
                function escapeRegExp(str) {
                    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                }
                function getTodoCommentsRegExp() {
                    const singleLineCommentStart = /(?:\/\/+\s*)/.source;
                    const multiLineCommentStart = /(?:\/\*+\s*)/.source;
                    const anyNumberOfSpacesAndAsterisksAtStartOfLine = /(?:^(?:\s|\*)*)/.source;
                    const preamble = "(" + anyNumberOfSpacesAndAsterisksAtStartOfLine + "|" + singleLineCommentStart + "|" + multiLineCommentStart + ")";
                    const literals = "(?:" + map(descriptors, (d) => "(" + escapeRegExp(d.text) + ")").join("|") + ")";
                    const endOfLineOrEndOfComment = /(?:$|\*\/)/.source;
                    const messageRemainder = /(?:.*?)/.source;
                    const messagePortion = "(" + literals + messageRemainder + ")";
                    const regExpString = preamble + messagePortion + endOfLineOrEndOfComment;
                    return new RegExp(regExpString, "gim");
                }
                function isLetterOrDigit(char) {
                    return char >= 97 /* a */ && char <= 122 /* z */ || char >= 65 /* A */ && char <= 90 /* Z */ || char >= 48 /* _0 */ && char <= 57 /* _9 */;
                }
                function isNodeModulesFile(path) {
                    return stringContains(path, "/node_modules/");
                }
            }
            function getRenameInfo2(fileName, position, preferences) {
                synchronizeHostData();
                return ts_Rename_exports.getRenameInfo(program, getValidSourceFile(fileName), position, preferences || {});
            }
            function getRefactorContext(file, positionOrRange, preferences, formatOptions, triggerReason, kind) {
                const [startPosition, endPosition] = typeof positionOrRange === "number" ? [positionOrRange, void 0] : [positionOrRange.pos, positionOrRange.end];
                return {
                    file,
                    startPosition,
                    endPosition,
                    program: getProgram(),
                    host,
                    formatContext: ts_formatting_exports.getFormatContext(formatOptions, host),
                    // TODO: GH#18217
                    cancellationToken,
                    preferences,
                    triggerReason,
                    kind
                };
            }
            function getInlayHintsContext(file, span, preferences) {
                return {
                    file,
                    program: getProgram(),
                    host,
                    span,
                    preferences,
                    cancellationToken
                };
            }
            function getSmartSelectionRange2(fileName, position) {
                return ts_SmartSelectionRange_exports.getSmartSelectionRange(position, syntaxTreeCache.getCurrentSourceFile(fileName));
            }
            function getApplicableRefactors2(fileName, positionOrRange, preferences = emptyOptions, triggerReason, kind) {
                synchronizeHostData();
                const file = getValidSourceFile(fileName);
                return ts_refactor_exports.getApplicableRefactors(getRefactorContext(file, positionOrRange, preferences, emptyOptions, triggerReason, kind));
            }
            function getEditsForRefactor2(fileName, formatOptions, positionOrRange, refactorName13, actionName2, preferences = emptyOptions) {
                synchronizeHostData();
                const file = getValidSourceFile(fileName);
                return ts_refactor_exports.getEditsForRefactor(getRefactorContext(file, positionOrRange, preferences, formatOptions), refactorName13, actionName2);
            }
            function toLineColumnOffset(fileName, position) {
                if (position === 0) {
                    return { line: 0, character: 0 };
                }
                return sourceMapper.toLineColumnOffset(fileName, position);
            }
            function prepareCallHierarchy(fileName, position) {
                synchronizeHostData();
                const declarations = ts_CallHierarchy_exports.resolveCallHierarchyDeclaration(program, getTouchingPropertyName(getValidSourceFile(fileName), position));
                return declarations && mapOneOrMany(declarations, (declaration) => ts_CallHierarchy_exports.createCallHierarchyItem(program, declaration));
            }
            function provideCallHierarchyIncomingCalls(fileName, position) {
                synchronizeHostData();
                const sourceFile = getValidSourceFile(fileName);
                const declaration = firstOrOnly(ts_CallHierarchy_exports.resolveCallHierarchyDeclaration(program, position === 0 ? sourceFile : getTouchingPropertyName(sourceFile, position)));
                return declaration ? ts_CallHierarchy_exports.getIncomingCalls(program, declaration, cancellationToken) : [];
            }
            function provideCallHierarchyOutgoingCalls(fileName, position) {
                synchronizeHostData();
                const sourceFile = getValidSourceFile(fileName);
                const declaration = firstOrOnly(ts_CallHierarchy_exports.resolveCallHierarchyDeclaration(program, position === 0 ? sourceFile : getTouchingPropertyName(sourceFile, position)));
                return declaration ? ts_CallHierarchy_exports.getOutgoingCalls(program, declaration) : [];
            }
            function provideInlayHints2(fileName, span, preferences = emptyOptions) {
                synchronizeHostData();
                const sourceFile = getValidSourceFile(fileName);
                return ts_InlayHints_exports.provideInlayHints(getInlayHintsContext(sourceFile, span, preferences));
            }
            const ls = {
                dispose,
                cleanupSemanticCache,
                getSyntacticDiagnostics,
                getSemanticDiagnostics,
                getSuggestionDiagnostics,
                getCompilerOptionsDiagnostics,
                getSyntacticClassifications: getSyntacticClassifications2,
                getSemanticClassifications: getSemanticClassifications3,
                getEncodedSyntacticClassifications: getEncodedSyntacticClassifications2,
                getEncodedSemanticClassifications: getEncodedSemanticClassifications3,
                getCompletionsAtPosition: getCompletionsAtPosition2,
                getCompletionEntryDetails: getCompletionEntryDetails2,
                getCompletionEntrySymbol: getCompletionEntrySymbol2,
                getSignatureHelpItems: getSignatureHelpItems2,
                getQuickInfoAtPosition,
                getDefinitionAtPosition: getDefinitionAtPosition2,
                getDefinitionAndBoundSpan: getDefinitionAndBoundSpan2,
                getImplementationAtPosition,
                getTypeDefinitionAtPosition: getTypeDefinitionAtPosition2,
                getReferencesAtPosition,
                findReferences,
                getFileReferences,
                getOccurrencesAtPosition,
                getDocumentHighlights,
                getNameOrDottedNameSpan,
                getBreakpointStatementAtPosition,
                getNavigateToItems: getNavigateToItems2,
                getRenameInfo: getRenameInfo2,
                getSmartSelectionRange: getSmartSelectionRange2,
                findRenameLocations,
                getNavigationBarItems: getNavigationBarItems2,
                getNavigationTree: getNavigationTree2,
                getOutliningSpans,
                getTodoComments,
                getBraceMatchingAtPosition,
                getIndentationAtPosition,
                getFormattingEditsForRange,
                getFormattingEditsForDocument,
                getFormattingEditsAfterKeystroke,
                getDocCommentTemplateAtPosition: getDocCommentTemplateAtPosition2,
                isValidBraceCompletionAtPosition,
                getJsxClosingTagAtPosition,
                getSpanOfEnclosingComment,
                getCodeFixesAtPosition,
                getCombinedCodeFix,
                applyCodeActionCommand,
                organizeImports: organizeImports2,
                getEditsForFileRename: getEditsForFileRename2,
                getEmitOutput,
                getNonBoundSourceFile,
                getProgram,
                getCurrentProgram: () => program,
                getAutoImportProvider,
                updateIsDefinitionOfReferencedSymbols,
                getApplicableRefactors: getApplicableRefactors2,
                getEditsForRefactor: getEditsForRefactor2,
                toLineColumnOffset,
                getSourceMapper: () => sourceMapper,
                clearSourceMapperCache: () => sourceMapper.clearCache(),
                prepareCallHierarchy,
                provideCallHierarchyIncomingCalls,
                provideCallHierarchyOutgoingCalls,
                toggleLineComment,
                toggleMultilineComment,
                commentSelection,
                uncommentSelection,
                provideInlayHints: provideInlayHints2,
                getSupportedCodeFixes
            };
            switch (languageServiceMode) {
                case 0 /* Semantic */:
                    break;
                case 1 /* PartialSemantic */:
                    invalidOperationsInPartialSemanticMode.forEach((key) => ls[key] = () => {
                        throw new Error(`LanguageService Operation: ${key} not allowed in LanguageServiceMode.PartialSemantic`);
                    });
                    break;
                case 2 /* Syntactic */:
                    invalidOperationsInSyntacticMode.forEach((key) => ls[key] = () => {
                        throw new Error(`LanguageService Operation: ${key} not allowed in LanguageServiceMode.Syntactic`);
                    });
                    break;
                default:
                    Debug.assertNever(languageServiceMode);
            }
            return ls;
        }