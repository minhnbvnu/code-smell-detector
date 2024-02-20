function makeImportSpecifier2(propertyName, name) {
            return factory.createImportSpecifier(
            /*isTypeOnly*/
            false, propertyName === name ? void 0 : factory.createIdentifier(propertyName), factory.createIdentifier(name));
        }