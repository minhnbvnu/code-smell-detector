function isImportOrExportSpecifierName(location) {
            return !!location.parent && isImportOrExportSpecifier(location.parent) && location.parent.propertyName === location;
        }