function createExportSpecifiers(names, allowTypeModifier) {
            return factory.createNodeArray(map(names, (n) => factory.createExportSpecifier(allowTypeModifier && n.isTypeOnly, 
            /*propertyName*/
            void 0, n.node)));
        }