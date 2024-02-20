function sortFixInfo(fixes, sourceFile, program, packageJsonImportFilter, host) {
            const _toPath = (fileName) => toPath(fileName, host.getCurrentDirectory(), hostGetCanonicalFileName(host));
            return sort(fixes, (a, b) => compareBooleans(!!a.isJsxNamespaceFix, !!b.isJsxNamespaceFix) || compareValues(a.fix.kind, b.fix.kind) || compareModuleSpecifiers(a.fix, b.fix, sourceFile, program, packageJsonImportFilter.allowsImportingSpecifier, _toPath));
        }