function checkAndReportErrorForUsingTypeAsNamespace(errorLocation, name, meaning) {
                const namespaceMeaning = 1920 /* Namespace */ | (isInJSFile(errorLocation) ? 111551 /* Value */ : 0);
                if (meaning === namespaceMeaning) {
                    const symbol = resolveSymbol(resolveName(errorLocation, name, 788968 /* Type */ & ~namespaceMeaning, 
                    /*nameNotFoundMessage*/
                    void 0, 
                    /*nameArg*/
                    void 0, 
                    /*isUse*/
                    false));
                    const parent2 = errorLocation.parent;
                    if (symbol) {
                        if (isQualifiedName(parent2)) {
                            Debug.assert(parent2.left === errorLocation, "Should only be resolving left side of qualified name as a namespace");
                            const propName = parent2.right.escapedText;
                            const propType = getPropertyOfType(getDeclaredTypeOfSymbol(symbol), propName);
                            if (propType) {
                                error(parent2, Diagnostics.Cannot_access_0_1_because_0_is_a_type_but_not_a_namespace_Did_you_mean_to_retrieve_the_type_of_the_property_1_in_0_with_0_1, unescapeLeadingUnderscores(name), unescapeLeadingUnderscores(propName));
                                return true;
                            }
                        }
                        error(errorLocation, Diagnostics._0_only_refers_to_a_type_but_is_being_used_as_a_namespace_here, unescapeLeadingUnderscores(name));
                        return true;
                    }
                }
                return false;
            }