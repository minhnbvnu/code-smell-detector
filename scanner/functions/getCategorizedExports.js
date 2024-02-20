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