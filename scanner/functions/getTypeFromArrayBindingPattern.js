function getTypeFromArrayBindingPattern(pattern, includePatternInType, reportErrors2) {
                const elements = pattern.elements;
                const lastElement = lastOrUndefined(elements);
                const restElement = lastElement && lastElement.kind === 205 /* BindingElement */ && lastElement.dotDotDotToken ? lastElement : void 0;
                if (elements.length === 0 || elements.length === 1 && restElement) {
                    return languageVersion >= 2 /* ES2015 */ ? createIterableType(anyType) : anyArrayType;
                }
                const elementTypes = map(elements, (e) => isOmittedExpression(e) ? anyType : getTypeFromBindingElement(e, includePatternInType, reportErrors2));
                const minLength = findLastIndex(elements, (e) => !(e === restElement || isOmittedExpression(e) || hasDefaultValue(e)), elements.length - 1) + 1;
                const elementFlags = map(elements, (e, i) => e === restElement ? 4 /* Rest */ : i >= minLength ? 2 /* Optional */ : 1 /* Required */);
                let result = createTupleType(elementTypes, elementFlags);
                if (includePatternInType) {
                    result = cloneTypeReference(result);
                    result.pattern = pattern;
                    result.objectFlags |= 131072 /* ContainsObjectOrArrayLiteral */;
                }
                return result;
            }