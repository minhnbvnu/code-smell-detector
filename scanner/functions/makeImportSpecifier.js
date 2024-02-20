function makeImportSpecifier(propertyName, name) {
            return factory.createImportSpecifier(
            /*isTypeOnly*/
            false, propertyName !== void 0 && propertyName !== name ? factory.createIdentifier(propertyName) : void 0, factory.createIdentifier(name));
        }