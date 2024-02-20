function convertTypeAcquisitionFromJson(jsonOptions, basePath, configFileName) {
            const errors = [];
            const options = convertTypeAcquisitionFromJsonWorker(jsonOptions, basePath, errors, configFileName);
            return { options, errors };
        }