function moduleSymbolToValidIdentifier(moduleSymbol, target, forceCapitalize) {
            return moduleSpecifierToValidIdentifier(removeFileExtension(stripQuotes(moduleSymbol.name)), target, forceCapitalize);
        }