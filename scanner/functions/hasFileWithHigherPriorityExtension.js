function hasFileWithHigherPriorityExtension(file, literalFiles, wildcardFiles, extensions, keyMapper) {
            const extensionGroup = forEach(extensions, (group2) => fileExtensionIsOneOf(file, group2) ? group2 : void 0);
            if (!extensionGroup) {
                return false;
            }
            for (const ext of extensionGroup) {
                if (fileExtensionIs(file, ext)) {
                    return false;
                }
                const higherPriorityPath = keyMapper(changeExtension(file, ext));
                if (literalFiles.has(higherPriorityPath) || wildcardFiles.has(higherPriorityPath)) {
                    if (ext === ".d.ts" /* Dts */ && (fileExtensionIs(file, ".js" /* Js */) || fileExtensionIs(file, ".jsx" /* Jsx */))) {
                        continue;
                    }
                    return true;
                }
            }
            return false;
        }