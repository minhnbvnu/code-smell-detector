function getSerializedCompilerOption(options) {
            const compilerOptions = extend(options, defaultInitCompilerOptions);
            return serializeCompilerOptions(compilerOptions);
        }