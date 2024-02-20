function isNightly() {
            return stringContains(version, "-dev") || stringContains(version, "-insiders");
        }