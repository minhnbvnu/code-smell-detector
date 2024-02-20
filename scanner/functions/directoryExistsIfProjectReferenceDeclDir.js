function directoryExistsIfProjectReferenceDeclDir(dir) {
                const dirPath = host.toPath(dir);
                const dirPathWithTrailingDirectorySeparator = `${dirPath}${directorySeparator}`;
                return forEachKey(setOfDeclarationDirectories, (declDirPath) => dirPath === declDirPath || // Any parent directory of declaration dir
                    startsWith(declDirPath, dirPathWithTrailingDirectorySeparator) || // Any directory inside declaration dir
                    startsWith(dirPath, `${declDirPath}/`));
            }