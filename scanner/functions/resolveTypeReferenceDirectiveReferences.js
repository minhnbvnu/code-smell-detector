function resolveTypeReferenceDirectiveReferences(typeDirectiveReferences, containingFile, redirectedReference, options, containingSourceFile, reusedNames) {
                var _a2;
                return resolveNamesWithLocalCache({
                    entries: typeDirectiveReferences,
                    containingFile,
                    containingSourceFile,
                    redirectedReference,
                    options,
                    reusedNames,
                    perFileCache: resolvedTypeReferenceDirectives,
                    loader: createTypeReferenceResolutionLoader(containingFile, redirectedReference, options, ((_a2 = resolutionHost.getCompilerHost) == null ? void 0 : _a2.call(resolutionHost)) || resolutionHost, typeReferenceDirectiveResolutionCache),
                    getResolutionWithResolvedFileName: getResolvedTypeReferenceDirective2,
                    shouldRetryResolution: (resolution) => resolution.resolvedTypeReferenceDirective === void 0
                });
            }