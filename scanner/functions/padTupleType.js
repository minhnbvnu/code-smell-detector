function padTupleType(type, pattern) {
                const patternElements = pattern.elements;
                const elementTypes = getTypeArguments(type).slice();
                const elementFlags = type.target.elementFlags.slice();
                for (let i = getTypeReferenceArity(type); i < patternElements.length; i++) {
                    const e = patternElements[i];
                    if (i < patternElements.length - 1 || !(e.kind === 205 /* BindingElement */ && e.dotDotDotToken)) {
                        elementTypes.push(!isOmittedExpression(e) && hasDefaultValue(e) ? getTypeFromBindingElement(e, 
                        /*includePatternInType*/
                        false, 
                        /*reportErrors*/
                        false) : anyType);
                        elementFlags.push(2 /* Optional */);
                        if (!isOmittedExpression(e) && !hasDefaultValue(e)) {
                            reportImplicitAny(e, anyType);
                        }
                    }
                }
                return createTupleType(elementTypes, elementFlags, type.target.readonly);
            }