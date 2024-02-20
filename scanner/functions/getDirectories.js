function getDirectories(rootDir) {
                const rootDirPath = toPath3(rootDir);
                const result = tryReadDirectory2(rootDir, rootDirPath);
                if (result) {
                    return result.directories.slice();
                }
                return host.getDirectories(rootDir);
            }