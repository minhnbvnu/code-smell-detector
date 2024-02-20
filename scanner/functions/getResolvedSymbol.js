function getResolvedSymbol(node) {
                const links = getNodeLinks(node);
                if (!links.resolvedSymbol) {
                    links.resolvedSymbol = !nodeIsMissing(node) && resolveName(node, node.escapedText, 111551 /* Value */ | 1048576 /* ExportValue */, getCannotFindNameDiagnosticForName(node), node, !isWriteOnlyAccess(node), 
                    /*excludeGlobals*/
                    false) || unknownSymbol;
                }
                return links.resolvedSymbol;
            }