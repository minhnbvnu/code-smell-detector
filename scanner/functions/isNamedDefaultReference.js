function isNamedDefaultReference(e) {
            return e.propertyName !== void 0 && e.propertyName.escapedText === "default" /* Default */;
        }