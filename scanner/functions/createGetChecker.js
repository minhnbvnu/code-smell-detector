function createGetChecker(program, host) {
            return memoizeOne((isFromPackageJson) => isFromPackageJson ? host.getPackageJsonAutoImportProvider().getTypeChecker() : program.getTypeChecker());
        }