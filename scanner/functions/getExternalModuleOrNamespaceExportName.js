function getExternalModuleOrNamespaceExportName(ns, node, allowComments, allowSourceMaps) {
                if (ns && hasSyntacticModifier(node, 1 /* Export */)) {
                    return getNamespaceMemberName(ns, getName(node), allowComments, allowSourceMaps);
                }
                return getExportName(node, allowComments, allowSourceMaps);
            }