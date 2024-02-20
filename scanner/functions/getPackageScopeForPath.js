function getPackageScopeForPath(fileName, state) {
            const parts = getPathComponents(fileName);
            parts.pop();
            while (parts.length > 0) {
                const pkg = getPackageJsonInfo(getPathFromPathComponents(parts), 
                /*onlyRecordFailures*/
                false, state);
                if (pkg) {
                    return pkg;
                }
                parts.pop();
            }
            return void 0;
        }