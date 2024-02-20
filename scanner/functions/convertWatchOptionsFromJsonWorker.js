function convertWatchOptionsFromJsonWorker(jsonOptions, basePath, errors) {
            return convertOptionsFromJson(getCommandLineWatchOptionsMap(), jsonOptions, basePath, 
            /*defaultOptions*/
            void 0, watchOptionsDidYouMeanDiagnostics, errors);
        }