function getMatchedFileSpec(program, fileName) {
            var _a2;
            const configFile = program.getCompilerOptions().configFile;
            if (!((_a2 = configFile == null ? void 0 : configFile.configFileSpecs) == null ? void 0 : _a2.validatedFilesSpec))
                return void 0;
            const filePath = program.getCanonicalFileName(fileName);
            const basePath = getDirectoryPath(getNormalizedAbsolutePath(configFile.fileName, program.getCurrentDirectory()));
            return find(configFile.configFileSpecs.validatedFilesSpec, (fileSpec) => program.getCanonicalFileName(getNormalizedAbsolutePath(fileSpec, basePath)) === filePath);
        }