function convertCompilerOptionsForTelemetry(opts) {
            const out = {};
            for (const key in opts) {
                if (hasProperty(opts, key)) {
                    const type = getOptionFromName(key);
                    if (type !== void 0) {
                        out[key] = getOptionValueWithEmptyStrings(opts[key], type);
                    }
                }
            }
            return out;
        }