function isNameMatch(name) {
                return name === exportSymbol.escapedName || exportKind !== 0 /* Named */ && name === "default" /* Default */;
            }