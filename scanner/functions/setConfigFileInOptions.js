function setConfigFileInOptions(options, configFile) {
            if (configFile) {
                Object.defineProperty(options, "configFile", { enumerable: false, writable: false, value: configFile });
            }
        }