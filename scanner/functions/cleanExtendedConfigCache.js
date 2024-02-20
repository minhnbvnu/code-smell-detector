function cleanExtendedConfigCache(extendedConfigCache, extendedConfigFilePath, toPath3) {
            if (!extendedConfigCache.delete(extendedConfigFilePath))
                return;
            extendedConfigCache.forEach(({ extendedResult }, key) => {
                var _a2;
                if ((_a2 = extendedResult.extendedSourceFiles) == null ? void 0 : _a2.some((extendedFile) => toPath3(extendedFile) === extendedConfigFilePath)) {
                    cleanExtendedConfigCache(extendedConfigCache, key, toPath3);
                }
            });
        }