function getExportSpecifierLocalTargetSymbol(node) {
                if (isExportSpecifier(node)) {
                    return node.parent.parent.moduleSpecifier ? getExternalModuleMember(node.parent.parent, node) : resolveEntityName(node.propertyName || node.name, 111551 /* Value */ | 788968 /* Type */ | 1920 /* Namespace */ | 2097152 /* Alias */);
                }
                else {
                    return resolveEntityName(node, 111551 /* Value */ | 788968 /* Type */ | 1920 /* Namespace */ | 2097152 /* Alias */);
                }
            }