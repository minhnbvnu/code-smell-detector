function onProgramCreateComplete() {
                host.compilerHost.fileExists = originalFileExists;
                host.compilerHost.directoryExists = originalDirectoryExists;
                host.compilerHost.getDirectories = originalGetDirectories;
            }