function bindObjectDefinePropertyAssignment(node) {
                let namespaceSymbol = lookupSymbolForPropertyAccess(node.arguments[0]);
                const isToplevel = node.parent.parent.kind === 308 /* SourceFile */;
                namespaceSymbol = bindPotentiallyMissingNamespaces(namespaceSymbol, node.arguments[0], isToplevel, 
                /*isPrototypeProperty*/
                false, 
                /*containerIsClass*/
                false);
                bindPotentiallyNewExpandoMemberToNamespace(node, namespaceSymbol, 
                /*isPrototypeProperty*/
                false);
            }