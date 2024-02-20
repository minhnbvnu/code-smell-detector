function originIsPackageJsonImport(origin) {
            return (originIsExport(origin) || originIsResolvedExport(origin)) && !!origin.isFromPackageJson;
        }