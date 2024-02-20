function getOriginalOrResolvedModuleFileName(result) {
            return result.resolvedModule && (result.resolvedModule.originalPath || result.resolvedModule.resolvedFileName);
        }