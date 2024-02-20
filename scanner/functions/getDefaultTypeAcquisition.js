function getDefaultTypeAcquisition(configFileName) {
            return { enable: !!configFileName && getBaseFileName(configFileName) === "jsconfig.json", include: [], exclude: [] };
        }