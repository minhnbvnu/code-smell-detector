function checkConfigFileUpToDateStatus(state, configFile, oldestOutputFileTime, oldestOutputFileName) {
            const tsconfigTime = getModifiedTime2(state, configFile);
            if (oldestOutputFileTime < tsconfigTime) {
                return {
                    type: 6 /* OutOfDateWithSelf */,
                    outOfDateOutputFileName: oldestOutputFileName,
                    newerInputFileName: configFile
                };
            }
        }