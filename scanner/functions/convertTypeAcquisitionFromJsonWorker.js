function convertTypeAcquisitionFromJsonWorker(jsonOptions, basePath, errors, configFileName) {
            const options = getDefaultTypeAcquisition(configFileName);
            convertOptionsFromJson(getCommandLineTypeAcquisitionMap(), jsonOptions, basePath, options, typeAcquisitionDidYouMeanDiagnostics, errors);
            return options;
        }