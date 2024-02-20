function removeResolutionsOfFile(filePath) {
                removeResolutionsOfFileFromCache(resolvedModuleNames, filePath, getResolvedModule2);
                removeResolutionsOfFileFromCache(resolvedTypeReferenceDirectives, filePath, getResolvedTypeReferenceDirective2);
            }