function verboseReportProjectStatus(state, configFileName, status) {
            if (state.options.verbose) {
                reportUpToDateStatus(state, configFileName, status);
            }
        }