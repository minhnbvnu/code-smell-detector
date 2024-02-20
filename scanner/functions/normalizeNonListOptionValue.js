function normalizeNonListOptionValue(option, basePath, value) {
            if (option.isFilePath) {
                value = getNormalizedAbsolutePath(value, basePath);
                if (value === "") {
                    value = ".";
                }
            }
            return value;
        }