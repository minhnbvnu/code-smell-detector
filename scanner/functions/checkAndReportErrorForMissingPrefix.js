function checkAndReportErrorForMissingPrefix(errorLocation, name, nameArg) {
                if (!isIdentifier(errorLocation) || errorLocation.escapedText !== name || isTypeReferenceIdentifier(errorLocation) || isInTypeQuery(errorLocation)) {
                    return false;
                }
                const container = getThisContainer(errorLocation, 
                /*includeArrowFunctions*/
                false, 
                /*includeClassComputedPropertyName*/
                false);
                let location = container;
                while (location) {
                    if (isClassLike(location.parent)) {
                        const classSymbol = getSymbolOfDeclaration(location.parent);
                        if (!classSymbol) {
                            break;
                        }
                        const constructorType = getTypeOfSymbol(classSymbol);
                        if (getPropertyOfType(constructorType, name)) {
                            error(errorLocation, Diagnostics.Cannot_find_name_0_Did_you_mean_the_static_member_1_0, diagnosticName(nameArg), symbolToString(classSymbol));
                            return true;
                        }
                        if (location === container && !isStatic(location)) {
                            const instanceType = getDeclaredTypeOfSymbol(classSymbol).thisType;
                            if (getPropertyOfType(instanceType, name)) {
                                error(errorLocation, Diagnostics.Cannot_find_name_0_Did_you_mean_the_instance_member_this_0, diagnosticName(nameArg));
                                return true;
                            }
                        }
                    }
                    location = location.parent;
                }
                return false;
            }