function convertFileToEsModule(sourceFile, checker, changes, target, quotePreference) {
            const identifiers = { original: collectFreeIdentifiers(sourceFile), additional: /* @__PURE__ */ new Set() };
            const exports = collectExportRenames(sourceFile, checker, identifiers);
            convertExportsAccesses(sourceFile, exports, changes);
            let moduleExportsChangedToDefault = false;
            let useSitesToUnqualify;
            for (const statement of filter(sourceFile.statements, isVariableStatement)) {
                const newUseSites = convertVariableStatement(sourceFile, statement, changes, checker, identifiers, target, quotePreference);
                if (newUseSites) {
                    copyEntries(newUseSites, useSitesToUnqualify != null ? useSitesToUnqualify : useSitesToUnqualify = /* @__PURE__ */ new Map());
                }
            }
            for (const statement of filter(sourceFile.statements, (s) => !isVariableStatement(s))) {
                const moduleExportsChanged = convertStatement(sourceFile, statement, checker, changes, identifiers, target, exports, useSitesToUnqualify, quotePreference);
                moduleExportsChangedToDefault = moduleExportsChangedToDefault || moduleExportsChanged;
            }
            useSitesToUnqualify == null ? void 0 : useSitesToUnqualify.forEach((replacement, original) => {
                changes.replaceNode(sourceFile, original, replacement);
            });
            return moduleExportsChangedToDefault;
        }