function getBaseTypes(type) {
                if (!type.baseTypesResolved) {
                    if (pushTypeResolution(type, 7 /* ResolvedBaseTypes */)) {
                        if (type.objectFlags & 8 /* Tuple */) {
                            type.resolvedBaseTypes = [getTupleBaseType(type)];
                        }
                        else if (type.symbol.flags & (32 /* Class */ | 64 /* Interface */)) {
                            if (type.symbol.flags & 32 /* Class */) {
                                resolveBaseTypesOfClass(type);
                            }
                            if (type.symbol.flags & 64 /* Interface */) {
                                resolveBaseTypesOfInterface(type);
                            }
                        }
                        else {
                            Debug.fail("type must be class or interface");
                        }
                        if (!popTypeResolution() && type.symbol.declarations) {
                            for (const declaration of type.symbol.declarations) {
                                if (declaration.kind === 260 /* ClassDeclaration */ || declaration.kind === 261 /* InterfaceDeclaration */) {
                                    reportCircularBaseType(declaration, type);
                                }
                            }
                        }
                    }
                    type.baseTypesResolved = true;
                }
                return type.resolvedBaseTypes;
            }