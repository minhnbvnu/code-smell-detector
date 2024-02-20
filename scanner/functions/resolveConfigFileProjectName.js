function resolveConfigFileProjectName(project) {
            if (fileExtensionIs(project, ".json" /* Json */)) {
                return project;
            }
            return combinePaths(project, "tsconfig.json");
        }