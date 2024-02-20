function getJsxManagedAttributesFromLocatedAttributes(context, ns, attributesType) {
                const managedSym = getJsxLibraryManagedAttributes(ns);
                if (managedSym) {
                    const declaredManagedType = getDeclaredTypeOfSymbol(managedSym);
                    const ctorType = getStaticTypeOfReferencedJsxConstructor(context);
                    if (managedSym.flags & 524288 /* TypeAlias */) {
                        const params = getSymbolLinks(managedSym).typeParameters;
                        if (length(params) >= 2) {
                            const args = fillMissingTypeArguments([ctorType, attributesType], params, 2, isInJSFile(context));
                            return getTypeAliasInstantiation(managedSym, args);
                        }
                    }
                    if (length(declaredManagedType.typeParameters) >= 2) {
                        const args = fillMissingTypeArguments([ctorType, attributesType], declaredManagedType.typeParameters, 2, isInJSFile(context));
                        return createTypeReference(declaredManagedType, args);
                    }
                }
                return attributesType;
            }