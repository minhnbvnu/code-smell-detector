function validateEnding({ ending, value }) {
                return ending !== 0 /* Minimal */ || value === processEnding(relativeToBaseUrl, [ending], compilerOptions, host);
            }