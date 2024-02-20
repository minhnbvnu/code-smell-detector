function resolveModuleNamesWorker(moduleNames, containingFile, reusedNames) {
                var _a3, _b2;
                if (!moduleNames.length)
                    return emptyArray;
                const containingFileName = getNormalizedAbsolutePath(containingFile.originalFileName, currentDirectory);
                const redirectedReference = getRedirectReferenceForResolution(containingFile);
                (_a3 = tracing) == null ? void 0 : _a3.push(tracing.Phase.Program, "resolveModuleNamesWorker", { containingFileName });
                mark("beforeResolveModule");
                const result = actualResolveModuleNamesWorker(moduleNames, containingFileName, redirectedReference, options, containingFile, reusedNames);
                mark("afterResolveModule");
                measure("ResolveModule", "beforeResolveModule", "afterResolveModule");
                (_b2 = tracing) == null ? void 0 : _b2.pop();
                return result;
            }