            function resolveNamesWithLocalCache({ entries, containingFile, containingSourceFile, redirectedReference, options, perFileCache, reusedNames, loader, getResolutionWithResolvedFileName, shouldRetryResolution, logChanges }) {
                var _a2;
                const path = resolutionHost.toPath(containingFile);
                const resolutionsInFile = perFileCache.get(path) || perFileCache.set(path, createModeAwareCache()).get(path);
                const resolvedModules = [];
                const hasInvalidatedNonRelativeUnresolvedImport = logChanges && isFileWithInvalidatedNonRelativeUnresolvedImports(path);
                const program = resolutionHost.getCurrentProgram();
                const oldRedirect = program && program.getResolvedProjectReferenceToRedirect(containingFile);
                const unmatchedRedirects = oldRedirect ? !redirectedReference || redirectedReference.sourceFile.path !== oldRedirect.sourceFile.path : !!redirectedReference;
                const seenNamesInFile = createModeAwareCache();
                for (const entry of entries) {
                    const name = loader.nameAndMode.getName(entry);
                    const mode = loader.nameAndMode.getMode(entry, containingSourceFile);
                    let resolution = resolutionsInFile.get(name, mode);
                    if (!seenNamesInFile.has(name, mode) && unmatchedRedirects || !resolution || resolution.isInvalidated || // If the name is unresolved import that was invalidated, recalculate
                        hasInvalidatedNonRelativeUnresolvedImport && !isExternalModuleNameRelative(name) && shouldRetryResolution(resolution)) {
                        const existingResolution = resolution;
                        resolution = loader.resolve(name, mode);
                        if (resolutionHost.onDiscoveredSymlink && resolutionIsSymlink(resolution)) {
                            resolutionHost.onDiscoveredSymlink();
                        }
                        resolutionsInFile.set(name, mode, resolution);
                        watchFailedLookupLocationsOfExternalModuleResolutions(name, resolution, path, getResolutionWithResolvedFileName);
                        if (existingResolution) {
                            stopWatchFailedLookupLocationOfResolution(existingResolution, path, getResolutionWithResolvedFileName);
                        }
                        if (logChanges && filesWithChangedSetOfUnresolvedImports && !resolutionIsEqualTo(existingResolution, resolution)) {
                            filesWithChangedSetOfUnresolvedImports.push(path);
                            logChanges = false;
                        }
                    }
                    else {
                        const host = ((_a2 = resolutionHost.getCompilerHost) == null ? void 0 : _a2.call(resolutionHost)) || resolutionHost;
                        if (isTraceEnabled(options, host) && !seenNamesInFile.has(name, mode)) {
                            const resolved = getResolutionWithResolvedFileName(resolution);
                            trace(host, perFileCache === resolvedModuleNames ? (resolved == null ? void 0 : resolved.resolvedFileName) ? resolved.packageId ? Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2_with_Package_ID_3 : Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2 : Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_not_resolved : (resolved == null ? void 0 : resolved.resolvedFileName) ? resolved.packageId ? Diagnostics.Reusing_resolution_of_type_reference_directive_0_from_1_of_old_program_it_was_successfully_resolved_to_2_with_Package_ID_3 : Diagnostics.Reusing_resolution_of_type_reference_directive_0_from_1_of_old_program_it_was_successfully_resolved_to_2 : Diagnostics.Reusing_resolution_of_type_reference_directive_0_from_1_of_old_program_it_was_not_resolved, name, containingFile, resolved == null ? void 0 : resolved.resolvedFileName, (resolved == null ? void 0 : resolved.packageId) && packageIdToString(resolved.packageId));
                        }
                    }
                    Debug.assert(resolution !== void 0 && !resolution.isInvalidated);
                    seenNamesInFile.set(name, mode, true);
                    resolvedModules.push(resolution);
                }
                reusedNames == null ? void 0 : reusedNames.forEach((entry) => seenNamesInFile.set(loader.nameAndMode.getName(entry), loader.nameAndMode.getMode(entry, containingSourceFile), true));
                if (resolutionsInFile.size() !== seenNamesInFile.size()) {
                    resolutionsInFile.forEach((resolution, name, mode) => {
                        if (!seenNamesInFile.has(name, mode)) {
                            stopWatchFailedLookupLocationOfResolution(resolution, path, getResolutionWithResolvedFileName);
                            resolutionsInFile.delete(name, mode);
                        }
                    });
                }
                return resolvedModules;
                function resolutionIsEqualTo(oldResolution, newResolution) {
                    if (oldResolution === newResolution) {
                        return true;
                    }
                    if (!oldResolution || !newResolution) {
                        return false;
                    }
                    const oldResult = getResolutionWithResolvedFileName(oldResolution);
                    const newResult = getResolutionWithResolvedFileName(newResolution);
                    if (oldResult === newResult) {
                        return true;
                    }
                    if (!oldResult || !newResult) {
                        return false;
                    }
                    return oldResult.resolvedFileName === newResult.resolvedFileName;
                }
            }
            function resolveTypeReferenceDirectiveReferences(typeDirectiveReferences, containingFile, redirectedReference, options, containingSourceFile, reusedNames) {
            function resolveModuleNameLiterals(moduleLiterals, containingFile, redirectedReference, options, containingSourceFile, reusedNames) {