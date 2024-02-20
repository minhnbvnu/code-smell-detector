function tryGetImportedPackageName(sourceFile, pos) {
            const moduleSpecifierText = tryCast(getTokenAtPosition(sourceFile, pos), isStringLiteral);
            if (!moduleSpecifierText)
                return void 0;
            const moduleName = moduleSpecifierText.text;
            const { packageName } = parsePackageName(moduleName);
            return isExternalModuleNameRelative(packageName) ? void 0 : packageName;
        }