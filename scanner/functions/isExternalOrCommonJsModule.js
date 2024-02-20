function isExternalOrCommonJsModule(file) {
            return (file.externalModuleIndicator || file.commonJsModuleIndicator) !== void 0;
        }