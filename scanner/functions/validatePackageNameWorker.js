function validatePackageNameWorker(packageName, supportScopedPackage) {
            if (!packageName) {
                return 1 /* EmptyName */;
            }
            if (packageName.length > maxPackageNameLength) {
                return 2 /* NameTooLong */;
            }
            if (packageName.charCodeAt(0) === 46 /* dot */) {
                return 3 /* NameStartsWithDot */;
            }
            if (packageName.charCodeAt(0) === 95 /* _ */) {
                return 4 /* NameStartsWithUnderscore */;
            }
            if (supportScopedPackage) {
                const matches = /^@([^/]+)\/([^/]+)$/.exec(packageName);
                if (matches) {
                    const scopeResult = validatePackageNameWorker(matches[1], 
                    /*supportScopedPackage*/
                    false);
                    if (scopeResult !== 0 /* Ok */) {
                        return { name: matches[1], isScopeName: true, result: scopeResult };
                    }
                    const packageResult = validatePackageNameWorker(matches[2], 
                    /*supportScopedPackage*/
                    false);
                    if (packageResult !== 0 /* Ok */) {
                        return { name: matches[2], isScopeName: false, result: packageResult };
                    }
                    return 0 /* Ok */;
                }
            }
            if (encodeURIComponent(packageName) !== packageName) {
                return 5 /* NameContainsNonURISafeCharacters */;
            }
            return 0 /* Ok */;
        }