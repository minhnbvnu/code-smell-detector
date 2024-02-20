function makeUniqueFilename(proposedFilename, extension, inDirectory, host) {
            let newFilename = proposedFilename;
            for (let i = 1;; i++) {
                const name = combinePaths(inDirectory, newFilename + extension);
                if (!host.fileExists(name))
                    return newFilename;
                newFilename = `${proposedFilename}.${i}`;
            }
        }