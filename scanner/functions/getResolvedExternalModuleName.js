function getResolvedExternalModuleName(host, file, referenceFile) {
            return file.moduleName || getExternalModuleNameFromPath(host, file.fileName, referenceFile && referenceFile.fileName);
        }