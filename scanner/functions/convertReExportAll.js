function convertReExportAll(reExported, checker) {
            const moduleSpecifier = reExported.text;
            const moduleSymbol = checker.getSymbolAtLocation(reExported);
            const exports = moduleSymbol ? moduleSymbol.exports : emptyMap;
            return exports.has("export=" /* ExportEquals */) ? [[reExportDefault(moduleSpecifier)], true] : !exports.has("default" /* Default */) ? [[reExportStar(moduleSpecifier)], false] : (
            // If there's some non-default export, must include both `export *` and `export default`.
            exports.size > 1 ? [[reExportStar(moduleSpecifier), reExportDefault(moduleSpecifier)], true] : [[reExportDefault(moduleSpecifier)], true]);
        }