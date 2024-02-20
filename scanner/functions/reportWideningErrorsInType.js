function reportWideningErrorsInType(type) {
                let errorReported = false;
                if (getObjectFlags(type) & 65536 /* ContainsWideningType */) {
                    if (type.flags & 1048576 /* Union */) {
                        if (some(type.types, isEmptyObjectType)) {
                            errorReported = true;
                        }
                        else {
                            for (const t of type.types) {
                                if (reportWideningErrorsInType(t)) {
                                    errorReported = true;
                                }
                            }
                        }
                    }
                    if (isArrayOrTupleType(type)) {
                        for (const t of getTypeArguments(type)) {
                            if (reportWideningErrorsInType(t)) {
                                errorReported = true;
                            }
                        }
                    }
                    if (isObjectLiteralType2(type)) {
                        for (const p of getPropertiesOfObjectType(type)) {
                            const t = getTypeOfSymbol(p);
                            if (getObjectFlags(t) & 65536 /* ContainsWideningType */) {
                                if (!reportWideningErrorsInType(t)) {
                                    error(p.valueDeclaration, Diagnostics.Object_literal_s_property_0_implicitly_has_an_1_type, symbolToString(p), typeToString(getWidenedType(t)));
                                }
                                errorReported = true;
                            }
                        }
                    }
                }
                return errorReported;
            }