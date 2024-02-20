function setCommonJsModuleIndicator(node) {
                if (file.externalModuleIndicator && file.externalModuleIndicator !== true) {
                    return false;
                }
                if (!file.commonJsModuleIndicator) {
                    file.commonJsModuleIndicator = node;
                    if (!file.externalModuleIndicator) {
                        bindSourceFileAsExternalModule();
                    }
                }
                return true;
            }