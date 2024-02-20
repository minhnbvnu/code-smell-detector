function bindInStrictMode(file2, opts) {
                if (getStrictOptionValue(opts, "alwaysStrict") && !file2.isDeclarationFile) {
                    return true;
                }
                else {
                    return !!file2.externalModuleIndicator;
                }
            }