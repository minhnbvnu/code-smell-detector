function readPackageJsonTSConfigField(jsonContent, baseDirectory, state) {
            return readPackageJsonPathField(jsonContent, "tsconfig", baseDirectory, state);
        }