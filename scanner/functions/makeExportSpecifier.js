function makeExportSpecifier(propertyName, name) {
            return factory.createExportSpecifier(
            /*isTypeOnly*/
            false, propertyName === name ? void 0 : factory.createIdentifier(propertyName), factory.createIdentifier(name));
        }