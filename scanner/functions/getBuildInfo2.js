function getBuildInfo2(state, bundle) {
            var _a2, _b, _c;
            const currentDirectory = Debug.checkDefined(state.program).getCurrentDirectory();
            const buildInfoDirectory = getDirectoryPath(getNormalizedAbsolutePath(getTsBuildInfoEmitOutputFilePath(state.compilerOptions), currentDirectory));
            const latestChangedDtsFile = state.latestChangedDtsFile ? relativeToBuildInfoEnsuringAbsolutePath(state.latestChangedDtsFile) : void 0;
            const fileNames = [];
            const fileNameToFileId = /* @__PURE__ */ new Map();
            const root = [];
            if (outFile(state.compilerOptions)) {
                const fileInfos2 = arrayFrom(state.fileInfos.entries(), ([key, value]) => {
                    const fileId = toFileId(key);
                    tryAddRoot(key, fileId);
                    return value.impliedFormat ? { version: value.version, impliedFormat: value.impliedFormat, signature: void 0, affectsGlobalScope: void 0 } : value.version;
                });
                const program2 = {
                    fileNames,
                    fileInfos: fileInfos2,
                    root,
                    options: convertToProgramBuildInfoCompilerOptions(state.compilerOptions),
                    outSignature: state.outSignature,
                    latestChangedDtsFile,
                    pendingEmit: !state.programEmitPending ? void 0 : (
                    // Pending is undefined or None is encoded as undefined
                    state.programEmitPending === getBuilderFileEmit(state.compilerOptions) ? false : (
                    // Pending emit is same as deteremined by compilerOptions
                    state.programEmitPending))
                    // Actual value
                };
                const { js, dts, commonSourceDirectory, sourceFiles } = bundle;
                state.bundle = bundle = {
                    commonSourceDirectory,
                    sourceFiles,
                    js: js || (!state.compilerOptions.emitDeclarationOnly ? (_a2 = state.bundle) == null ? void 0 : _a2.js : void 0),
                    dts: dts || (getEmitDeclarations(state.compilerOptions) ? (_b = state.bundle) == null ? void 0 : _b.dts : void 0)
                };
                return createBuildInfo(program2, bundle);
            }
            let fileIdsList;
            let fileNamesToFileIdListId;
            let emitSignatures;
            const fileInfos = arrayFrom(state.fileInfos.entries(), ([key, value]) => {
                var _a3, _b2;
                const fileId = toFileId(key);
                tryAddRoot(key, fileId);
                Debug.assert(fileNames[fileId - 1] === relativeToBuildInfo(key));
                const oldSignature = (_a3 = state.oldSignatures) == null ? void 0 : _a3.get(key);
                const actualSignature = oldSignature !== void 0 ? oldSignature || void 0 : value.signature;
                if (state.compilerOptions.composite) {
                    const file = state.program.getSourceFileByPath(key);
                    if (!isJsonSourceFile(file) && sourceFileMayBeEmitted(file, state.program)) {
                        const emitSignature = (_b2 = state.emitSignatures) == null ? void 0 : _b2.get(key);
                        if (emitSignature !== actualSignature) {
                            (emitSignatures || (emitSignatures = [])).push(emitSignature === void 0 ? fileId : (
                            // There is no emit, encode as false
                            // fileId, signature: emptyArray if signature only differs in dtsMap option than our own compilerOptions otherwise EmitSignature
                            [fileId, !isString(emitSignature) && emitSignature[0] === actualSignature ? emptyArray : emitSignature]));
                        }
                    }
                }
                return value.version === actualSignature ? value.affectsGlobalScope || value.impliedFormat ? (
                // If file version is same as signature, dont serialize signature
                { version: value.version, signature: void 0, affectsGlobalScope: value.affectsGlobalScope, impliedFormat: value.impliedFormat }) : (
                // If file info only contains version and signature and both are same we can just write string
                value.version) : actualSignature !== void 0 ? (
                // If signature is not same as version, encode signature in the fileInfo
                oldSignature === void 0 ? (
                // If we havent computed signature, use fileInfo as is
                value) : (
                // Serialize fileInfo with new updated signature
                { version: value.version, signature: actualSignature, affectsGlobalScope: value.affectsGlobalScope, impliedFormat: value.impliedFormat })) : (
                // Signature of the FileInfo is undefined, serialize it as false
                { version: value.version, signature: false, affectsGlobalScope: value.affectsGlobalScope, impliedFormat: value.impliedFormat });
            });
            let referencedMap;
            if (state.referencedMap) {
                referencedMap = arrayFrom(state.referencedMap.keys()).sort(compareStringsCaseSensitive).map((key) => [
                    toFileId(key),
                    toFileIdListId(state.referencedMap.getValues(key))
                ]);
            }
            let exportedModulesMap;
            if (state.exportedModulesMap) {
                exportedModulesMap = mapDefined(arrayFrom(state.exportedModulesMap.keys()).sort(compareStringsCaseSensitive), (key) => {
                    var _a3;
                    const oldValue = (_a3 = state.oldExportedModulesMap) == null ? void 0 : _a3.get(key);
                    if (oldValue === void 0)
                        return [toFileId(key), toFileIdListId(state.exportedModulesMap.getValues(key))];
                    if (oldValue)
                        return [toFileId(key), toFileIdListId(oldValue)];
                    return void 0;
                });
            }
            let semanticDiagnosticsPerFile;
            if (state.semanticDiagnosticsPerFile) {
                for (const key of arrayFrom(state.semanticDiagnosticsPerFile.keys()).sort(compareStringsCaseSensitive)) {
                    const value = state.semanticDiagnosticsPerFile.get(key);
                    (semanticDiagnosticsPerFile || (semanticDiagnosticsPerFile = [])).push(value.length ? [
                        toFileId(key),
                        convertToReusableDiagnostics(value, relativeToBuildInfo)
                    ] : toFileId(key));
                }
            }
            let affectedFilesPendingEmit;
            if ((_c = state.affectedFilesPendingEmit) == null ? void 0 : _c.size) {
                const fullEmitForOptions = getBuilderFileEmit(state.compilerOptions);
                const seenFiles = /* @__PURE__ */ new Set();
                for (const path of arrayFrom(state.affectedFilesPendingEmit.keys()).sort(compareStringsCaseSensitive)) {
                    if (tryAddToSet(seenFiles, path)) {
                        const file = state.program.getSourceFileByPath(path);
                        if (!file || !sourceFileMayBeEmitted(file, state.program))
                            continue;
                        const fileId = toFileId(path), pendingEmit = state.affectedFilesPendingEmit.get(path);
                        (affectedFilesPendingEmit || (affectedFilesPendingEmit = [])).push(pendingEmit === fullEmitForOptions ? fileId : (
                        // Pending full emit per options
                        pendingEmit === 8 /* Dts */ ? [fileId] : (
                        // Pending on Dts only
                        [fileId, pendingEmit]))
                        // Anything else
                        );
                    }
                }
            }
            let changeFileSet;
            if (state.changedFilesSet.size) {
                for (const path of arrayFrom(state.changedFilesSet.keys()).sort(compareStringsCaseSensitive)) {
                    (changeFileSet || (changeFileSet = [])).push(toFileId(path));
                }
            }
            const program = {
                fileNames,
                fileInfos,
                root,
                options: convertToProgramBuildInfoCompilerOptions(state.compilerOptions),
                fileIdsList,
                referencedMap,
                exportedModulesMap,
                semanticDiagnosticsPerFile,
                affectedFilesPendingEmit,
                changeFileSet,
                emitSignatures,
                latestChangedDtsFile
            };
            return createBuildInfo(program, bundle);
            function relativeToBuildInfoEnsuringAbsolutePath(path) {
                return relativeToBuildInfo(getNormalizedAbsolutePath(path, currentDirectory));
            }
            function relativeToBuildInfo(path) {
                return ensurePathIsNonModuleName(getRelativePathFromDirectory(buildInfoDirectory, path, state.program.getCanonicalFileName));
            }
            function toFileId(path) {
                let fileId = fileNameToFileId.get(path);
                if (fileId === void 0) {
                    fileNames.push(relativeToBuildInfo(path));
                    fileNameToFileId.set(path, fileId = fileNames.length);
                }
                return fileId;
            }
            function toFileIdListId(set) {
                const fileIds = arrayFrom(set.keys(), toFileId).sort(compareValues);
                const key = fileIds.join();
                let fileIdListId = fileNamesToFileIdListId == null ? void 0 : fileNamesToFileIdListId.get(key);
                if (fileIdListId === void 0) {
                    (fileIdsList || (fileIdsList = [])).push(fileIds);
                    (fileNamesToFileIdListId || (fileNamesToFileIdListId = /* @__PURE__ */ new Map())).set(key, fileIdListId = fileIdsList.length);
                }
                return fileIdListId;
            }
            function tryAddRoot(path, fileId) {
                const file = state.program.getSourceFile(path);
                if (!state.program.getFileIncludeReasons().get(file.path).some((r) => r.kind === 0 /* RootFile */))
                    return;
                if (!root.length)
                    return root.push(fileId);
                const last2 = root[root.length - 1];
                const isLastStartEnd = isArray(last2);
                if (isLastStartEnd && last2[1] === fileId - 1)
                    return last2[1] = fileId;
                if (isLastStartEnd || root.length === 1 || last2 !== fileId - 1)
                    return root.push(fileId);
                const lastButOne = root[root.length - 2];
                if (!isNumber(lastButOne) || lastButOne !== last2 - 1)
                    return root.push(fileId);
                root[root.length - 2] = [lastButOne, fileId];
                return root.length = root.length - 1;
            }
            function convertToProgramBuildInfoCompilerOptions(options) {
                let result;
                const { optionsNameMap } = getOptionsNameMap();
                for (const name of getOwnKeys(options).sort(compareStringsCaseSensitive)) {
                    const optionInfo = optionsNameMap.get(name.toLowerCase());
                    if (optionInfo == null ? void 0 : optionInfo.affectsBuildInfo) {
                        (result || (result = {}))[name] = convertToReusableCompilerOptionValue(optionInfo, options[name], relativeToBuildInfoEnsuringAbsolutePath);
                    }
                }
                return result;
            }
        }