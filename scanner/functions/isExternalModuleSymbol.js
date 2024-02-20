function isExternalModuleSymbol(moduleSymbol) {
            return !!(moduleSymbol.flags & 1536 /* Module */) && moduleSymbol.name.charCodeAt(0) === 34 /* doubleQuote */;
        }