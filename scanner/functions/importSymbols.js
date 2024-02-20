function importSymbols(importAdder, symbols) {
            symbols.forEach((s) => importAdder.addImportFromExportedSymbol(s, 
            /*isValidTypeOnlyUseSite*/
            true));
        }