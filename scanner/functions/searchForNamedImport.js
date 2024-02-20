function searchForNamedImport(namedBindings) {
                if (!namedBindings) {
                    return;
                }
                for (const element of namedBindings.elements) {
                    const { name, propertyName } = element;
                    if (!isNameMatch((propertyName || name).escapedText)) {
                        continue;
                    }
                    if (propertyName) {
                        singleReferences.push(propertyName);
                        if (!isForRename || name.escapedText === exportSymbol.escapedName) {
                            addSearch(name, checker.getSymbolAtLocation(name));
                        }
                    }
                    else {
                        const localSymbol = element.kind === 278 /* ExportSpecifier */ && element.propertyName ? checker.getExportSpecifierLocalTargetSymbol(element) : checker.getSymbolAtLocation(name);
                        addSearch(name, localSymbol);
                    }
                }
            }