function removeWildcardFilesWithLowerPriorityExtension(file, wildcardFiles, extensions, keyMapper) {
            const extensionGroup = forEach(extensions, (group2) => fileExtensionIsOneOf(file, group2) ? group2 : void 0);
            if (!extensionGroup) {
                return;
            }
            for (let i = extensionGroup.length - 1; i >= 0; i--) {
                const ext = extensionGroup[i];
                if (fileExtensionIs(file, ext)) {
                    return;
                }
                const lowerPriorityPath = keyMapper(changeExtension(file, ext));
                wildcardFiles.delete(lowerPriorityPath);
            }
        }