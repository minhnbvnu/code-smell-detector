function checkSourceFilesBelongToPath(sourceFiles, rootDirectory) {
                let allFilesBelongToPath = true;
                const absoluteRootDirectoryPath = host.getCanonicalFileName(getNormalizedAbsolutePath(rootDirectory, currentDirectory));
                for (const sourceFile of sourceFiles) {
                    if (!sourceFile.isDeclarationFile) {
                        const absoluteSourceFilePath = host.getCanonicalFileName(getNormalizedAbsolutePath(sourceFile.fileName, currentDirectory));
                        if (absoluteSourceFilePath.indexOf(absoluteRootDirectoryPath) !== 0) {
                            addProgramDiagnosticExplainingFile(sourceFile, Diagnostics.File_0_is_not_under_rootDir_1_rootDir_is_expected_to_contain_all_source_files, [sourceFile.fileName, rootDirectory]);
                            allFilesBelongToPath = false;
                        }
                    }
                }
                return allFilesBelongToPath;
            }