function createTupleTargetType(elementFlags, readonly, namedMemberDeclarations) {
                const arity = elementFlags.length;
                const minLength = countWhere(elementFlags, (f) => !!(f & (1 /* Required */ | 8 /* Variadic */)));
                let typeParameters;
                const properties = [];
                let combinedFlags = 0;
                if (arity) {
                    typeParameters = new Array(arity);
                    for (let i = 0; i < arity; i++) {
                        const typeParameter = typeParameters[i] = createTypeParameter();
                        const flags = elementFlags[i];
                        combinedFlags |= flags;
                        if (!(combinedFlags & 12 /* Variable */)) {
                            const property = createSymbol(4 /* Property */ | (flags & 2 /* Optional */ ? 16777216 /* Optional */ : 0), "" + i, readonly ? 8 /* Readonly */ : 0);
                            property.links.tupleLabelDeclaration = namedMemberDeclarations == null ? void 0 : namedMemberDeclarations[i];
                            property.links.type = typeParameter;
                            properties.push(property);
                        }
                    }
                }
                const fixedLength = properties.length;
                const lengthSymbol = createSymbol(4 /* Property */, "length", readonly ? 8 /* Readonly */ : 0);
                if (combinedFlags & 12 /* Variable */) {
                    lengthSymbol.links.type = numberType;
                }
                else {
                    const literalTypes = [];
                    for (let i = minLength; i <= arity; i++)
                        literalTypes.push(getNumberLiteralType(i));
                    lengthSymbol.links.type = getUnionType(literalTypes);
                }
                properties.push(lengthSymbol);
                const type = createObjectType(8 /* Tuple */ | 4 /* Reference */);
                type.typeParameters = typeParameters;
                type.outerTypeParameters = void 0;
                type.localTypeParameters = typeParameters;
                type.instantiations = /* @__PURE__ */ new Map();
                type.instantiations.set(getTypeListId(type.typeParameters), type);
                type.target = type;
                type.resolvedTypeArguments = type.typeParameters;
                type.thisType = createTypeParameter();
                type.thisType.isThisType = true;
                type.thisType.constraint = type;
                type.declaredProperties = properties;
                type.declaredCallSignatures = emptyArray;
                type.declaredConstructSignatures = emptyArray;
                type.declaredIndexInfos = emptyArray;
                type.elementFlags = elementFlags;
                type.minLength = minLength;
                type.fixedLength = fixedLength;
                type.hasRestElement = !!(combinedFlags & 12 /* Variable */);
                type.combinedFlags = combinedFlags;
                type.readonly = readonly;
                type.labeledElementDeclarations = namedMemberDeclarations;
                return type;
            }