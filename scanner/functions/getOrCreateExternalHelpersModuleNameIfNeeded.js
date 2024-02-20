function getOrCreateExternalHelpersModuleNameIfNeeded(factory2, node, compilerOptions, hasExportStarsToExportValues, hasImportStarOrImportDefault) {
            if (compilerOptions.importHelpers && isEffectiveExternalModule(node, compilerOptions)) {
                const externalHelpersModuleName = getExternalHelpersModuleName(node);
                if (externalHelpersModuleName) {
                    return externalHelpersModuleName;
                }
                const moduleKind = getEmitModuleKind(compilerOptions);
                let create = (hasExportStarsToExportValues || getESModuleInterop(compilerOptions) && hasImportStarOrImportDefault) && moduleKind !== 4 /* System */ && (moduleKind < 5 /* ES2015 */ || node.impliedNodeFormat === 1 /* CommonJS */);
                if (!create) {
                    const helpers = getEmitHelpers(node);
                    if (helpers) {
                        for (const helper of helpers) {
                            if (!helper.scoped) {
                                create = true;
                                break;
                            }
                        }
                    }
                }
                if (create) {
                    const parseNode = getOriginalNode(node, isSourceFile);
                    const emitNode = getOrCreateEmitNode(parseNode);
                    return emitNode.externalHelpersModuleName || (emitNode.externalHelpersModuleName = factory2.createUniqueName(externalHelpersModuleNameText));
                }
            }
        }