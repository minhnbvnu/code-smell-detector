function getHelpersFromBundledSourceFiles(bundle) {
                let result;
                if (moduleKind === 0 /* None */ || printerOptions.noEmitHelpers) {
                    return void 0;
                }
                const bundledHelpers2 = /* @__PURE__ */ new Map();
                for (const sourceFile of bundle.sourceFiles) {
                    const shouldSkip = getExternalHelpersModuleName(sourceFile) !== void 0;
                    const helpers = getSortedEmitHelpers(sourceFile);
                    if (!helpers)
                        continue;
                    for (const helper of helpers) {
                        if (!helper.scoped && !shouldSkip && !bundledHelpers2.get(helper.name)) {
                            bundledHelpers2.set(helper.name, true);
                            (result || (result = [])).push(helper.name);
                        }
                    }
                }
                return result;
            }