function getBindAndCheckDiagnosticsForFileNoCache(sourceFile, cancellationToken) {
                return runWithCancellationToken(() => {
                    if (skipTypeChecking(sourceFile, options, program)) {
                        return emptyArray;
                    }
                    const typeChecker2 = getTypeChecker();
                    Debug.assert(!!sourceFile.bindDiagnostics);
                    const isJs = sourceFile.scriptKind === 1 /* JS */ || sourceFile.scriptKind === 2 /* JSX */;
                    const isCheckJs = isJs && isCheckJsEnabledForFile(sourceFile, options);
                    const isPlainJs = isPlainJsFile(sourceFile, options.checkJs);
                    const isTsNoCheck = !!sourceFile.checkJsDirective && sourceFile.checkJsDirective.enabled === false;
                    const includeBindAndCheckDiagnostics = !isTsNoCheck && (sourceFile.scriptKind === 3 /* TS */ || sourceFile.scriptKind === 4 /* TSX */ || sourceFile.scriptKind === 5 /* External */ || isPlainJs || isCheckJs || sourceFile.scriptKind === 7 /* Deferred */);
                    let bindDiagnostics = includeBindAndCheckDiagnostics ? sourceFile.bindDiagnostics : emptyArray;
                    let checkDiagnostics = includeBindAndCheckDiagnostics ? typeChecker2.getDiagnostics(sourceFile, cancellationToken) : emptyArray;
                    if (isPlainJs) {
                        bindDiagnostics = filter(bindDiagnostics, (d) => plainJSErrors.has(d.code));
                        checkDiagnostics = filter(checkDiagnostics, (d) => plainJSErrors.has(d.code));
                    }
                    return getMergedBindAndCheckDiagnostics(sourceFile, includeBindAndCheckDiagnostics && !isPlainJs, bindDiagnostics, checkDiagnostics, isCheckJs ? sourceFile.jsDocDiagnostics : void 0);
                });
            }