function tryChangeWithIgnoringPackageJson(oldFileName) {
                return !endsWith(oldFileName, "/package.json") ? tryChange(oldFileName) : void 0;
            }