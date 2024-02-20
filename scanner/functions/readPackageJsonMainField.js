function readPackageJsonMainField(jsonContent, baseDirectory, state) {
            return readPackageJsonPathField(jsonContent, "main", baseDirectory, state);
        }