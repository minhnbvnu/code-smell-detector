function getSetExternalModuleIndicator(options) {
            switch (getEmitModuleDetectionKind(options)) {
                case 3 /* Force */:
                    return (file) => {
                        file.externalModuleIndicator = isFileProbablyExternalModule(file) || !file.isDeclarationFile || void 0;
                    };
                case 1 /* Legacy */:
                    return (file) => {
                        file.externalModuleIndicator = isFileProbablyExternalModule(file);
                    };
                case 2 /* Auto */:
                    const checks = [isFileProbablyExternalModule];
                    if (options.jsx === 4 /* ReactJSX */ || options.jsx === 5 /* ReactJSXDev */) {
                        checks.push(isFileModuleFromUsingJSXTag);
                    }
                    checks.push(isFileForcedToBeModuleByFormat);
                    const combined = or(...checks);
                    const callback = (file) => void (file.externalModuleIndicator = combined(file));
                    return callback;
            }
        }