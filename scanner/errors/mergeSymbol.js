function mergeSymbol(target, source, unidirectional = false) {
                if (!(target.flags & getExcludedSymbolFlags(source.flags)) || (source.flags | target.flags) & 67108864 /* Assignment */) {
                    if (source === target) {
                        return target;
                    }
                    if (!(target.flags & 33554432 /* Transient */)) {
                        const resolvedTarget = resolveSymbol(target);
                        if (resolvedTarget === unknownSymbol) {
                            return source;
                        }
                        target = cloneSymbol(resolvedTarget);
                    }
                    if (source.flags & 512 /* ValueModule */ && target.flags & 512 /* ValueModule */ && target.constEnumOnlyModule && !source.constEnumOnlyModule) {
                        target.constEnumOnlyModule = false;
                    }
                    target.flags |= source.flags;
                    if (source.valueDeclaration) {
                        setValueDeclaration(target, source.valueDeclaration);
                    }
                    addRange(target.declarations, source.declarations);
                    if (source.members) {
                        if (!target.members)
                            target.members = createSymbolTable();
                        mergeSymbolTable(target.members, source.members, unidirectional);
                    }
                    if (source.exports) {
                        if (!target.exports)
                            target.exports = createSymbolTable();
                        mergeSymbolTable(target.exports, source.exports, unidirectional);
                    }
                    if (!unidirectional) {
                        recordMergedSymbol(target, source);
                    }
                }
                else if (target.flags & 1024 /* NamespaceModule */) {
                    if (target !== globalThisSymbol) {
                        error(source.declarations && getNameOfDeclaration(source.declarations[0]), Diagnostics.Cannot_augment_module_0_with_value_exports_because_it_resolves_to_a_non_module_entity, symbolToString(target));
                    }
                }
                else {
                    const isEitherEnum = !!(target.flags & 384 /* Enum */ || source.flags & 384 /* Enum */);
                    const isEitherBlockScoped = !!(target.flags & 2 /* BlockScopedVariable */ || source.flags & 2 /* BlockScopedVariable */);
                    const message = isEitherEnum ? Diagnostics.Enum_declarations_can_only_merge_with_namespace_or_other_enum_declarations : isEitherBlockScoped ? Diagnostics.Cannot_redeclare_block_scoped_variable_0 : Diagnostics.Duplicate_identifier_0;
                    const sourceSymbolFile = source.declarations && getSourceFileOfNode(source.declarations[0]);
                    const targetSymbolFile = target.declarations && getSourceFileOfNode(target.declarations[0]);
                    const isSourcePlainJs = isPlainJsFile(sourceSymbolFile, compilerOptions.checkJs);
                    const isTargetPlainJs = isPlainJsFile(targetSymbolFile, compilerOptions.checkJs);
                    const symbolName2 = symbolToString(source);
                    if (sourceSymbolFile && targetSymbolFile && amalgamatedDuplicates && !isEitherEnum && sourceSymbolFile !== targetSymbolFile) {
                        const firstFile = comparePaths(sourceSymbolFile.path, targetSymbolFile.path) === -1 /* LessThan */ ? sourceSymbolFile : targetSymbolFile;
                        const secondFile = firstFile === sourceSymbolFile ? targetSymbolFile : sourceSymbolFile;
                        const filesDuplicates = getOrUpdate(amalgamatedDuplicates, `${firstFile.path}|${secondFile.path}`, () => ({ firstFile, secondFile, conflictingSymbols: /* @__PURE__ */ new Map() }));
                        const conflictingSymbolInfo = getOrUpdate(filesDuplicates.conflictingSymbols, symbolName2, () => ({ isBlockScoped: isEitherBlockScoped, firstFileLocations: [], secondFileLocations: [] }));
                        if (!isSourcePlainJs)
                            addDuplicateLocations(conflictingSymbolInfo.firstFileLocations, source);
                        if (!isTargetPlainJs)
                            addDuplicateLocations(conflictingSymbolInfo.secondFileLocations, target);
                    }
                    else {
                        if (!isSourcePlainJs)
                            addDuplicateDeclarationErrorsForSymbols(source, message, symbolName2, target);
                        if (!isTargetPlainJs)
                            addDuplicateDeclarationErrorsForSymbols(target, message, symbolName2, source);
                    }
                }
                return target;
                function addDuplicateLocations(locs, symbol) {
                    if (symbol.declarations) {
                        for (const decl of symbol.declarations) {
                            pushIfUnique(locs, decl);
                        }
                    }
                }
            }