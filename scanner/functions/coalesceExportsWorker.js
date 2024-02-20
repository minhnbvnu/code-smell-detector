function coalesceExportsWorker(exportGroup, comparer) {
            if (exportGroup.length === 0) {
                return exportGroup;
            }
            const { exportWithoutClause, namedExports, typeOnlyExports } = getCategorizedExports(exportGroup);
            const coalescedExports = [];
            if (exportWithoutClause) {
                coalescedExports.push(exportWithoutClause);
            }
            for (const exportGroup2 of [namedExports, typeOnlyExports]) {
                if (exportGroup2.length === 0) {
                    continue;
                }
                const newExportSpecifiers = [];
                newExportSpecifiers.push(...flatMap(exportGroup2, (i) => i.exportClause && isNamedExports(i.exportClause) ? i.exportClause.elements : emptyArray));
                const sortedExportSpecifiers = sortSpecifiers(newExportSpecifiers, comparer);
                const exportDecl = exportGroup2[0];
                coalescedExports.push(factory.updateExportDeclaration(exportDecl, exportDecl.modifiers, exportDecl.isTypeOnly, exportDecl.exportClause && (isNamedExports(exportDecl.exportClause) ? factory.updateNamedExports(exportDecl.exportClause, sortedExportSpecifiers) : factory.updateNamespaceExport(exportDecl.exportClause, exportDecl.exportClause.name)), exportDecl.moduleSpecifier, exportDecl.assertClause));
            }
            return coalescedExports;
            function getCategorizedExports(exportGroup2) {
                let exportWithoutClause2;
                const namedExports2 = [];
                const typeOnlyExports2 = [];
                for (const exportDeclaration of exportGroup2) {
                    if (exportDeclaration.exportClause === void 0) {
                        exportWithoutClause2 = exportWithoutClause2 || exportDeclaration;
                    }
                    else if (exportDeclaration.isTypeOnly) {
                        typeOnlyExports2.push(exportDeclaration);
                    }
                    else {
                        namedExports2.push(exportDeclaration);
                    }
                }
                return {
                    exportWithoutClause: exportWithoutClause2,
                    namedExports: namedExports2,
                    typeOnlyExports: typeOnlyExports2
                };
            }
        }