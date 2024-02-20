function declareModuleMember(node, symbolFlags, symbolExcludes) {
                const hasExportModifier = !!(getCombinedModifierFlags(node) & 1 /* Export */) || jsdocTreatAsExported(node);
                if (symbolFlags & 2097152 /* Alias */) {
                    if (node.kind === 278 /* ExportSpecifier */ || node.kind === 268 /* ImportEqualsDeclaration */ && hasExportModifier) {
                        return declareSymbol(container.symbol.exports, container.symbol, node, symbolFlags, symbolExcludes);
                    }
                    else {
                        Debug.assertNode(container, canHaveLocals);
                        return declareSymbol(container.locals, 
                        /*parent*/
                        void 0, node, symbolFlags, symbolExcludes);
                    }
                }
                else {
                    if (isJSDocTypeAlias(node))
                        Debug.assert(isInJSFile(node));
                    if (!isAmbientModule(node) && (hasExportModifier || container.flags & 64 /* ExportContext */)) {
                        if (!canHaveLocals(container) || !container.locals || hasSyntacticModifier(node, 1024 /* Default */) && !getDeclarationName(node)) {
                            return declareSymbol(container.symbol.exports, container.symbol, node, symbolFlags, symbolExcludes);
                        }
                        const exportKind = symbolFlags & 111551 /* Value */ ? 1048576 /* ExportValue */ : 0;
                        const local = declareSymbol(container.locals, 
                        /*parent*/
                        void 0, node, exportKind, symbolExcludes);
                        local.exportSymbol = declareSymbol(container.symbol.exports, container.symbol, node, symbolFlags, symbolExcludes);
                        node.localSymbol = local;
                        return local;
                    }
                    else {
                        Debug.assertNode(container, canHaveLocals);
                        return declareSymbol(container.locals, 
                        /*parent*/
                        void 0, node, symbolFlags, symbolExcludes);
                    }
                }
            }