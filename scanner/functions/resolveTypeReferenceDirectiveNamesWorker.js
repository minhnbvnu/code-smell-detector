function resolveTypeReferenceDirectiveNamesWorker(typeDirectiveNames, containingFile, reusedNames) {
                var _a3, _b2;
                if (!typeDirectiveNames.length)
                    return [];
                const containingSourceFile = !isString(containingFile) ? containingFile : void 0;
                const containingFileName = !isString(containingFile) ? getNormalizedAbsolutePath(containingFile.originalFileName, currentDirectory) : containingFile;
                const redirectedReference = containingSourceFile && getRedirectReferenceForResolution(containingSourceFile);
                (_a3 = tracing) == null ? void 0 : _a3.push(tracing.Phase.Program, "resolveTypeReferenceDirectiveNamesWorker", { containingFileName });
                mark("beforeResolveTypeReference");
                const result = actualResolveTypeReferenceDirectiveNamesWorker(typeDirectiveNames, containingFileName, redirectedReference, options, containingSourceFile, reusedNames);
                mark("afterResolveTypeReference");
                measure("ResolveTypeReference", "beforeResolveTypeReference", "afterResolveTypeReference");
                (_b2 = tracing) == null ? void 0 : _b2.pop();
                return result;
            }