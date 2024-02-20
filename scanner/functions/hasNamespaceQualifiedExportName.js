function hasNamespaceQualifiedExportName(node) {
                return isExportOfNamespace(node) || isExternalModuleExport(node) && moduleKind !== 5 /* ES2015 */ && moduleKind !== 6 /* ES2020 */ && moduleKind !== 7 /* ES2022 */ && moduleKind !== 99 /* ESNext */ && moduleKind !== 4 /* System */;
            }