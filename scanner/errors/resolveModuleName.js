function resolveModuleName(moduleName, containingFile, compilerOptions, host, cache, redirectedReference, resolutionMode) {
            const traceEnabled = isTraceEnabled(compilerOptions, host);
            if (redirectedReference) {
                compilerOptions = redirectedReference.commandLine.options;
            }
            if (traceEnabled) {
                trace(host, Diagnostics.Resolving_module_0_from_1, moduleName, containingFile);
                if (redirectedReference) {
                    trace(host, Diagnostics.Using_compiler_options_of_project_reference_redirect_0, redirectedReference.sourceFile.fileName);
                }
            }
            const containingDirectory = getDirectoryPath(containingFile);
            let result = cache == null ? void 0 : cache.getFromDirectoryCache(moduleName, resolutionMode, containingDirectory, redirectedReference);
            if (result) {
                if (traceEnabled) {
                    trace(host, Diagnostics.Resolution_for_module_0_was_found_in_cache_from_location_1, moduleName, containingDirectory);
                }
            }
            else {
                let moduleResolution = compilerOptions.moduleResolution;
                if (moduleResolution === void 0) {
                    switch (getEmitModuleKind(compilerOptions)) {
                        case 1 /* CommonJS */:
                            moduleResolution = 2 /* Node10 */;
                            break;
                        case 100 /* Node16 */:
                            moduleResolution = 3 /* Node16 */;
                            break;
                        case 199 /* NodeNext */:
                            moduleResolution = 99 /* NodeNext */;
                            break;
                        default:
                            moduleResolution = 1 /* Classic */;
                            break;
                    }
                    if (traceEnabled) {
                        trace(host, Diagnostics.Module_resolution_kind_is_not_specified_using_0, ModuleResolutionKind[moduleResolution]);
                    }
                }
                else {
                    if (traceEnabled) {
                        trace(host, Diagnostics.Explicitly_specified_module_resolution_kind_Colon_0, ModuleResolutionKind[moduleResolution]);
                    }
                }
                perfLogger.logStartResolveModule(moduleName
                /* , containingFile, ModuleResolutionKind[moduleResolution]*/
                );
                switch (moduleResolution) {
                    case 3 /* Node16 */:
                        result = node16ModuleNameResolver(moduleName, containingFile, compilerOptions, host, cache, redirectedReference, resolutionMode);
                        break;
                    case 99 /* NodeNext */:
                        result = nodeNextModuleNameResolver(moduleName, containingFile, compilerOptions, host, cache, redirectedReference, resolutionMode);
                        break;
                    case 2 /* Node10 */:
                        result = nodeModuleNameResolver(moduleName, containingFile, compilerOptions, host, cache, redirectedReference);
                        break;
                    case 1 /* Classic */:
                        result = classicNameResolver(moduleName, containingFile, compilerOptions, host, cache, redirectedReference);
                        break;
                    case 100 /* Bundler */:
                        result = bundlerModuleNameResolver(moduleName, containingFile, compilerOptions, host, cache, redirectedReference);
                        break;
                    default:
                        return Debug.fail(`Unexpected moduleResolution: ${moduleResolution}`);
                }
                if (result && result.resolvedModule)
                    perfLogger.logInfoEvent(`Module "${moduleName}" resolved to "${result.resolvedModule.resolvedFileName}"`);
                perfLogger.logStopResolveModule(result && result.resolvedModule ? "" + result.resolvedModule.resolvedFileName : "null");
                cache == null ? void 0 : cache.getOrCreateCacheForDirectory(containingDirectory, redirectedReference).set(moduleName, resolutionMode, result);
                if (!isExternalModuleNameRelative(moduleName)) {
                    cache == null ? void 0 : cache.getOrCreateCacheForNonRelativeName(moduleName, resolutionMode, redirectedReference).set(containingDirectory, result);
                }
            }
            if (traceEnabled) {
                if (result.resolvedModule) {
                    if (result.resolvedModule.packageId) {
                        trace(host, Diagnostics.Module_name_0_was_successfully_resolved_to_1_with_Package_ID_2, moduleName, result.resolvedModule.resolvedFileName, packageIdToString(result.resolvedModule.packageId));
                    }
                    else {
                        trace(host, Diagnostics.Module_name_0_was_successfully_resolved_to_1, moduleName, result.resolvedModule.resolvedFileName);
                    }
                }
                else {
                    trace(host, Diagnostics.Module_name_0_was_not_resolved, moduleName);
                }
            }
            return result;
        }