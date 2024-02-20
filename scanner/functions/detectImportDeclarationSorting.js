function detectImportDeclarationSorting(imports, preferences) {
            const collateCaseSensitive = getOrganizeImportsComparer(preferences, 
            /*ignoreCase*/
            false);
            const collateCaseInsensitive = getOrganizeImportsComparer(preferences, 
            /*ignoreCase*/
            true);
            return detectSortCaseSensitivity(imports, (s) => getExternalModuleName2(getModuleSpecifierExpression(s)) || "", collateCaseSensitive, collateCaseInsensitive);
        }