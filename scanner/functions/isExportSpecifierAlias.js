function isExportSpecifierAlias(referenceLocation, exportSpecifier) {
                        const { parent: parent2, propertyName, name } = exportSpecifier;
                        Debug.assert(propertyName === referenceLocation || name === referenceLocation);
                        if (propertyName) {
                            return propertyName === referenceLocation;
                        }
                        else {
                            return !parent2.parent.moduleSpecifier;
                        }
                    }