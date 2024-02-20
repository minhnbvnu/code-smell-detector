function createWatchProgram(tsconfigPath, parseSettings) {
        log('Creating watch program for %s.', tsconfigPath);
        // create compiler host
        const watchCompilerHost = ts.createWatchCompilerHost(tsconfigPath, (0, shared_1.createDefaultCompilerOptionsFromExtra)(parseSettings), ts.sys, ts.createAbstractBuilder, diagnosticReporter, 
        /*reportWatchStatus*/ () => { });
        if (parseSettings.moduleResolver) {
            // eslint-disable-next-line deprecation/deprecation -- intentional for older TS versions
            watchCompilerHost.resolveModuleNames = (0, shared_1.getModuleResolver)(parseSettings.moduleResolver).resolveModuleNames;
        }
        // ensure readFile reads the code being linted instead of the copy on disk
        const oldReadFile = watchCompilerHost.readFile;
        watchCompilerHost.readFile = (filePathIn, encoding) => {
            const filePath = (0, shared_1.getCanonicalFileName)(filePathIn);
            const fileContent = filePath === currentLintOperationState.filePath
                ? currentLintOperationState.code
                : oldReadFile(filePath, encoding);
            if (fileContent !== undefined) {
                parsedFilesSeenHash.set(filePath, (0, shared_1.createHash)(fileContent));
            }
            return fileContent;
        };
        // ensure process reports error on failure instead of exiting process immediately
        watchCompilerHost.onUnRecoverableConfigFileDiagnostic = diagnosticReporter;
        // ensure process doesn't emit programs
        watchCompilerHost.afterProgramCreate = (program) => {
            // report error if there are any errors in the config file
            const configFileDiagnostics = program
                .getConfigFileParsingDiagnostics()
                .filter(diag => diag.category === ts.DiagnosticCategory.Error && diag.code !== 18003);
            if (configFileDiagnostics.length > 0) {
                diagnosticReporter(configFileDiagnostics[0]);
            }
        };
        /*
         * From the CLI, the file watchers won't matter, as the files will be parsed once and then forgotten.
         * When running from an IDE, these watchers will let us tell typescript about changes.
         *
         * ESLint IDE plugins will send us unfinished file content as the user types (before it's saved to disk).
         * We use the file watchers to tell typescript about this latest file content.
         *
         * When files are created (or renamed), we won't know about them because we have no filesystem watchers attached.
         * We use the folder watchers to tell typescript it needs to go and find new files in the project folders.
         */
        watchCompilerHost.watchFile = saveWatchCallback(fileWatchCallbackTrackingMap);
        watchCompilerHost.watchDirectory = saveWatchCallback(folderWatchCallbackTrackingMap);
        // allow files with custom extensions to be included in program (uses internal ts api)
        const oldOnDirectoryStructureHostCreate = watchCompilerHost.onCachedDirectoryStructureHostCreate;
        watchCompilerHost.onCachedDirectoryStructureHostCreate = (host) => {
            const oldReadDirectory = host.readDirectory;
            host.readDirectory = (path, extensions, exclude, include, depth) => oldReadDirectory(path, !extensions
                ? undefined
                : extensions.concat(parseSettings.extraFileExtensions), exclude, include, depth);
            oldOnDirectoryStructureHostCreate(host);
        };
        // This works only on 3.9
        watchCompilerHost.extraFileExtensions = parseSettings.extraFileExtensions.map(extension => ({
            extension,
            isMixedContent: true,
            scriptKind: ts.ScriptKind.Deferred,
        }));
        watchCompilerHost.trace = log;
        /**
         * TODO: this needs refinement and development, but we're allowing users to opt-in to this for now for testing and feedback.
         * See https://github.com/typescript-eslint/typescript-eslint/issues/2094
         */
        watchCompilerHost.useSourceOfProjectReferenceRedirect = () => parseSettings.EXPERIMENTAL_useSourceOfProjectReferenceRedirect;
        // Since we don't want to asynchronously update program we want to disable timeout methods
        // So any changes in the program will be delayed and updated when getProgram is called on watch
        let callback;
        if (isRunningNoTimeoutFix) {
            watchCompilerHost.setTimeout = undefined;
            watchCompilerHost.clearTimeout = undefined;
        }
        else {
            log('Running without timeout fix');
            // But because of https://github.com/microsoft/TypeScript/pull/37308 we cannot just set it to undefined
            // instead save it and call before getProgram is called
            watchCompilerHost.setTimeout = (cb, _ms, ...args) => {
                callback = cb.bind(/*this*/ undefined, ...args);
                return callback;
            };
            watchCompilerHost.clearTimeout = () => {
                callback = undefined;
            };
        }
        const watch = ts.createWatchProgram(watchCompilerHost);
        if (!isRunningNoTimeoutFix) {
            const originalGetProgram = watch.getProgram;
            watch.getProgram = () => {
                if (callback) {
                    callback();
                }
                callback = undefined;
                return originalGetProgram.call(watch);
            };
        }
        return watch;
    }