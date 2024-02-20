function addReferencedFilesToTypeDirective(file, key, mode) {
                    if (fileToDirective.has(file.path))
                        return;
                    fileToDirective.set(file.path, [key, mode]);
                    for (const { fileName, resolutionMode } of file.referencedFiles) {
                        const resolvedFile = resolveTripleslashReference(fileName, file.fileName);
                        const referencedFile = host.getSourceFile(resolvedFile);
                        if (referencedFile) {
                            addReferencedFilesToTypeDirective(referencedFile, key, resolutionMode || file.impliedNodeFormat);
                        }
                    }
                }