function collectExternalModuleInfo(context, sourceFile, resolver, compilerOptions) {
            const externalImports = [];
            const exportSpecifiers = createMultiMap();
            const exportedBindings = [];
            const uniqueExports = /* @__PURE__ */ new Map();
            let exportedNames;
            let hasExportDefault = false;
            let exportEquals;
            let hasExportStarsToExportValues = false;
            let hasImportStar = false;
            let hasImportDefault = false;
            for (const node of sourceFile.statements) {
                switch (node.kind) {
                    case 269 /* ImportDeclaration */:
                        externalImports.push(node);
                        if (!hasImportStar && getImportNeedsImportStarHelper(node)) {
                            hasImportStar = true;
                        }
                        if (!hasImportDefault && getImportNeedsImportDefaultHelper(node)) {
                            hasImportDefault = true;
                        }
                        break;
                    case 268 /* ImportEqualsDeclaration */:
                        if (node.moduleReference.kind === 280 /* ExternalModuleReference */) {
                            externalImports.push(node);
                        }
                        break;
                    case 275 /* ExportDeclaration */:
                        if (node.moduleSpecifier) {
                            if (!node.exportClause) {
                                externalImports.push(node);
                                hasExportStarsToExportValues = true;
                            }
                            else {
                                externalImports.push(node);
                                if (isNamedExports(node.exportClause)) {
                                    addExportedNamesForExportDeclaration(node);
                                }
                                else {
                                    const name = node.exportClause.name;
                                    if (!uniqueExports.get(idText(name))) {
                                        multiMapSparseArrayAdd(exportedBindings, getOriginalNodeId(node), name);
                                        uniqueExports.set(idText(name), true);
                                        exportedNames = append(exportedNames, name);
                                    }
                                    hasImportStar = true;
                                }
                            }
                        }
                        else {
                            addExportedNamesForExportDeclaration(node);
                        }
                        break;
                    case 274 /* ExportAssignment */:
                        if (node.isExportEquals && !exportEquals) {
                            exportEquals = node;
                        }
                        break;
                    case 240 /* VariableStatement */:
                        if (hasSyntacticModifier(node, 1 /* Export */)) {
                            for (const decl of node.declarationList.declarations) {
                                exportedNames = collectExportedVariableInfo(decl, uniqueExports, exportedNames);
                            }
                        }
                        break;
                    case 259 /* FunctionDeclaration */:
                        if (hasSyntacticModifier(node, 1 /* Export */)) {
                            if (hasSyntacticModifier(node, 1024 /* Default */)) {
                                if (!hasExportDefault) {
                                    multiMapSparseArrayAdd(exportedBindings, getOriginalNodeId(node), context.factory.getDeclarationName(node));
                                    hasExportDefault = true;
                                }
                            }
                            else {
                                const name = node.name;
                                if (!uniqueExports.get(idText(name))) {
                                    multiMapSparseArrayAdd(exportedBindings, getOriginalNodeId(node), name);
                                    uniqueExports.set(idText(name), true);
                                    exportedNames = append(exportedNames, name);
                                }
                            }
                        }
                        break;
                    case 260 /* ClassDeclaration */:
                        if (hasSyntacticModifier(node, 1 /* Export */)) {
                            if (hasSyntacticModifier(node, 1024 /* Default */)) {
                                if (!hasExportDefault) {
                                    multiMapSparseArrayAdd(exportedBindings, getOriginalNodeId(node), context.factory.getDeclarationName(node));
                                    hasExportDefault = true;
                                }
                            }
                            else {
                                const name = node.name;
                                if (name && !uniqueExports.get(idText(name))) {
                                    multiMapSparseArrayAdd(exportedBindings, getOriginalNodeId(node), name);
                                    uniqueExports.set(idText(name), true);
                                    exportedNames = append(exportedNames, name);
                                }
                            }
                        }
                        break;
                }
            }
            const externalHelpersImportDeclaration = createExternalHelpersImportDeclarationIfNeeded(context.factory, context.getEmitHelperFactory(), sourceFile, compilerOptions, hasExportStarsToExportValues, hasImportStar, hasImportDefault);
            if (externalHelpersImportDeclaration) {
                externalImports.unshift(externalHelpersImportDeclaration);
            }
            return { externalImports, exportSpecifiers, exportEquals, hasExportStarsToExportValues, exportedBindings, exportedNames, externalHelpersImportDeclaration };
            function addExportedNamesForExportDeclaration(node) {
                for (const specifier of cast(node.exportClause, isNamedExports).elements) {
                    if (!uniqueExports.get(idText(specifier.name))) {
                        const name = specifier.propertyName || specifier.name;
                        if (!node.moduleSpecifier) {
                            exportSpecifiers.add(idText(name), specifier);
                        }
                        const decl = resolver.getReferencedImportDeclaration(name) || resolver.getReferencedValueDeclaration(name);
                        if (decl) {
                            multiMapSparseArrayAdd(exportedBindings, getOriginalNodeId(decl), specifier.name);
                        }
                        uniqueExports.set(idText(specifier.name), true);
                        exportedNames = append(exportedNames, specifier.name);
                    }
                }
            }
        }