function needsBuild({ options }, status, config) {
            if (status.type !== 3 /* OutOfDateWithPrepend */ || options.force)
                return true;
            return config.fileNames.length === 0 || !!getConfigFileParsingDiagnostics(config).length || !isIncrementalCompilation(config.options);
        }