function bindPropertyAssignment(name, propertyAccess, isPrototypeProperty, containerIsClass) {
                let namespaceSymbol = lookupSymbolForPropertyAccess(name, container) || lookupSymbolForPropertyAccess(name, blockScopeContainer);
                const isToplevel = isTopLevelNamespaceAssignment(propertyAccess);
                namespaceSymbol = bindPotentiallyMissingNamespaces(namespaceSymbol, propertyAccess.expression, isToplevel, isPrototypeProperty, containerIsClass);
                bindPotentiallyNewExpandoMemberToNamespace(propertyAccess, namespaceSymbol, isPrototypeProperty);
            }