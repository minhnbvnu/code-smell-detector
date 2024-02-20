function mergeModuleAugmentation(moduleName) {
                var _a2, _b, _c;
                const moduleAugmentation = moduleName.parent;
                if (((_a2 = moduleAugmentation.symbol.declarations) == null ? void 0 : _a2[0]) !== moduleAugmentation) {
                    Debug.assert(moduleAugmentation.symbol.declarations.length > 1);
                    return;
                }
                if (isGlobalScopeAugmentation(moduleAugmentation)) {
                    mergeSymbolTable(globals, moduleAugmentation.symbol.exports);
                }
                else {
                    const moduleNotFoundError = !(moduleName.parent.parent.flags & 16777216 /* Ambient */) ? Diagnostics.Invalid_module_name_in_augmentation_module_0_cannot_be_found : void 0;
                    let mainModule = resolveExternalModuleNameWorker(moduleName, moduleName, moduleNotFoundError, 
                    /*isForAugmentation*/
                    true);
                    if (!mainModule) {
                        return;
                    }
                    mainModule = resolveExternalModuleSymbol(mainModule);
                    if (mainModule.flags & 1920 /* Namespace */) {
                        if (some(patternAmbientModules, (module2) => mainModule === module2.symbol)) {
                            const merged = mergeSymbol(moduleAugmentation.symbol, mainModule, 
                            /*unidirectional*/
                            true);
                            if (!patternAmbientModuleAugmentations) {
                                patternAmbientModuleAugmentations = /* @__PURE__ */ new Map();
                            }
                            patternAmbientModuleAugmentations.set(moduleName.text, merged);
                        }
                        else {
                            if (((_b = mainModule.exports) == null ? void 0 : _b.get("__export" /* ExportStar */)) && ((_c = moduleAugmentation.symbol.exports) == null ? void 0 : _c.size)) {
                                const resolvedExports = getResolvedMembersOrExportsOfSymbol(mainModule, "resolvedExports" /* resolvedExports */);
                                for (const [key, value] of arrayFrom(moduleAugmentation.symbol.exports.entries())) {
                                    if (resolvedExports.has(key) && !mainModule.exports.has(key)) {
                                        mergeSymbol(resolvedExports.get(key), value);
                                    }
                                }
                            }
                            mergeSymbol(mainModule, moduleAugmentation.symbol);
                        }
                    }
                    else {
                        error(moduleName, Diagnostics.Cannot_augment_module_0_because_it_resolves_to_a_non_module_entity, moduleName.text);
                    }
                }
            }