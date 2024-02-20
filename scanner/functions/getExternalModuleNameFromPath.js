function getExternalModuleNameFromPath(host, fileName, referencePath) {
            const getCanonicalFileName = (f) => host.getCanonicalFileName(f);
            const dir = toPath(referencePath ? getDirectoryPath(referencePath) : host.getCommonSourceDirectory(), host.getCurrentDirectory(), getCanonicalFileName);
            const filePath = getNormalizedAbsolutePath(fileName, host.getCurrentDirectory());
            const relativePath = getRelativePathToDirectoryOrUrl(dir, filePath, dir, getCanonicalFileName, 
            /*isAbsolutePathAnUrl*/
            false);
            const extensionless = removeFileExtension(relativePath);
            return referencePath ? ensurePathIsNonModuleName(extensionless) : extensionless;
        }