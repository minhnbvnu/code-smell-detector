function getTypeOfMappedSymbol(symbol) {
                if (!symbol.links.type) {
                    const mappedType = symbol.links.mappedType;
                    if (!pushTypeResolution(symbol, 0 /* Type */)) {
                        mappedType.containsError = true;
                        return errorType;
                    }
                    const templateType = getTemplateTypeFromMappedType(mappedType.target || mappedType);
                    const mapper = appendTypeMapping(mappedType.mapper, getTypeParameterFromMappedType(mappedType), symbol.links.keyType);
                    const propType = instantiateType(templateType, mapper);
                    let type = strictNullChecks && symbol.flags & 16777216 /* Optional */ && !maybeTypeOfKind(propType, 32768 /* Undefined */ | 16384 /* Void */) ? getOptionalType(propType, 
                    /*isProperty*/
                    true) : symbol.links.checkFlags & 524288 /* StripOptional */ ? removeMissingOrUndefinedType(propType) : propType;
                    if (!popTypeResolution()) {
                        error(currentNode, Diagnostics.Type_of_property_0_circularly_references_itself_in_mapped_type_1, symbolToString(symbol), typeToString(mappedType));
                        type = errorType;
                    }
                    symbol.links.type = type;
                }
                return symbol.links.type;
            }