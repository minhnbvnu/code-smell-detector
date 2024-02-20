function shouldReportNoInputFiles(fileNames, canJsonReportNoInutFiles, resolutionStack) {
            return fileNames.length === 0 && canJsonReportNoInutFiles && (!resolutionStack || resolutionStack.length === 0);
        }