function narrowTypeByConstructor(type, operator, identifier, assumeTrue) {
                    if (assumeTrue ? operator !== 34 /* EqualsEqualsToken */ && operator !== 36 /* EqualsEqualsEqualsToken */ : operator !== 35 /* ExclamationEqualsToken */ && operator !== 37 /* ExclamationEqualsEqualsToken */) {
                        return type;
                    }
                    const identifierType = getTypeOfExpression(identifier);
                    if (!isFunctionType(identifierType) && !isConstructorType(identifierType)) {
                        return type;
                    }
                    const prototypeProperty = getPropertyOfType(identifierType, "prototype");
                    if (!prototypeProperty) {
                        return type;
                    }
                    const prototypeType = getTypeOfSymbol(prototypeProperty);
                    const candidate = !isTypeAny(prototypeType) ? prototypeType : void 0;
                    if (!candidate || candidate === globalObjectType || candidate === globalFunctionType) {
                        return type;
                    }
                    if (isTypeAny(type)) {
                        return candidate;
                    }
                    return filterType(type, (t) => isConstructedBy(t, candidate));
                    function isConstructedBy(source, target) {
                        if (source.flags & 524288 /* Object */ && getObjectFlags(source) & 1 /* Class */ || target.flags & 524288 /* Object */ && getObjectFlags(target) & 1 /* Class */) {
                            return source.symbol === target.symbol;
                        }
                        return isTypeSubtypeOf(source, target);
                    }
                }