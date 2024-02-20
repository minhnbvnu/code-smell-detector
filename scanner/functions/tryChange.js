function tryChange(oldFileName) {
                const newFileName = oldToNew(oldFileName);
                return newFileName && { newFileName, updated: true };
            }