function getCommandLineTypeAcquisitionMap() {
            return commandLineTypeAcquisitionMapCache || (commandLineTypeAcquisitionMapCache = commandLineOptionsToMap(typeAcquisitionDeclarations));
        }