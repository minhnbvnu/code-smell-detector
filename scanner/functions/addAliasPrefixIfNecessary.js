function addAliasPrefixIfNecessary() {
                if (alias) {
                    pushSymbolKind("alias" /* alias */);
                    displayParts.push(spacePart());
                }
            }