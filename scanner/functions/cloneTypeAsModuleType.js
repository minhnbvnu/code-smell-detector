function cloneTypeAsModuleType(symbol, moduleType, referenceParent) {
                const result = createSymbol(symbol.flags, symbol.escapedName);
                result.declarations = symbol.declarations ? symbol.declarations.slice() : [];
                result.parent = symbol.parent;
                result.links.target = symbol;
                result.links.originatingImport = referenceParent;
                if (symbol.valueDeclaration)
                    result.valueDeclaration = symbol.valueDeclaration;
                if (symbol.constEnumOnlyModule)
                    result.constEnumOnlyModule = true;
                if (symbol.members)
                    result.members = new Map(symbol.members);
                if (symbol.exports)
                    result.exports = new Map(symbol.exports);
                const resolvedModuleType = resolveStructuredTypeMembers(moduleType);
                result.links.type = createAnonymousType(result, resolvedModuleType.members, emptyArray, emptyArray, resolvedModuleType.indexInfos);
                return result;
            }