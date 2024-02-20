function isSourceFileFromExternalLibrary(file) {
                return !!sourceFilesFoundSearchingNodeModules.get(file.path);
            }