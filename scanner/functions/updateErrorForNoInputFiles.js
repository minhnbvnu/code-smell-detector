function updateErrorForNoInputFiles(fileNames, configFileName, configFileSpecs, configParseDiagnostics, canJsonReportNoInutFiles) {
            const existingErrors = configParseDiagnostics.length;
            if (shouldReportNoInputFiles(fileNames, canJsonReportNoInutFiles)) {
                configParseDiagnostics.push(getErrorForNoInputFiles(configFileSpecs, configFileName));
            }
            else {
                filterMutate(configParseDiagnostics, (error) => !isErrorNoInputFiles(error));
            }
            return existingErrors !== configParseDiagnostics.length;
        }