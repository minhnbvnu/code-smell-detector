function getIgnoreDeprecationsVersion() {
                const ignoreDeprecations = options.ignoreDeprecations;
                if (ignoreDeprecations) {
                    if (ignoreDeprecations === "5.0") {
                        return new Version(ignoreDeprecations);
                    }
                    reportInvalidIgnoreDeprecations();
                }
                return Version.zero;
            }