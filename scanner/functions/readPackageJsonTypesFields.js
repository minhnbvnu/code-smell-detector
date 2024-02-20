function readPackageJsonTypesFields(jsonContent, baseDirectory, state) {
            return readPackageJsonPathField(jsonContent, "typings", baseDirectory, state) || readPackageJsonPathField(jsonContent, "types", baseDirectory, state);
        }