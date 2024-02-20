function getReferencedFileFromFileName(program, fileName, sourceFileDirectory, getCanonicalFileName) {
                        return toPath(program.getProjectReferenceRedirect(fileName) || fileName, sourceFileDirectory, getCanonicalFileName);
                    }