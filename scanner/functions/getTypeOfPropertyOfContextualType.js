function getTypeOfPropertyOfContextualType(type, name, nameType) {
                return mapType(type, (t) => {
                    var _a2;
                    if (isGenericMappedType(t) && !t.declaration.nameType) {
                        const constraint = getConstraintTypeFromMappedType(t);
                        const constraintOfConstraint = getBaseConstraintOfType(constraint) || constraint;
                        const propertyNameType = nameType || getStringLiteralType(unescapeLeadingUnderscores(name));
                        if (isTypeAssignableTo(propertyNameType, constraintOfConstraint)) {
                            return substituteIndexedMappedType(t, propertyNameType);
                        }
                    }
                    else if (t.flags & 3670016 /* StructuredType */) {
                        const prop = getPropertyOfType(t, name);
                        if (prop) {
                            return isCircularMappedProperty(prop) ? void 0 : getTypeOfSymbol(prop);
                        }
                        if (isTupleType(t) && isNumericLiteralName(name) && +name >= 0) {
                            const restType = getElementTypeOfSliceOfTupleType(t, t.target.fixedLength, 
                            /*endSkipCount*/
                            0, 
                            /*writing*/
                            false, 
                            /*noReductions*/
                            true);
                            if (restType) {
                                return restType;
                            }
                        }
                        return (_a2 = findApplicableIndexInfo(getIndexInfosOfStructuredType(t), nameType || getStringLiteralType(unescapeLeadingUnderscores(name)))) == null ? void 0 : _a2.type;
                    }
                    return void 0;
                }, 
                /*noReductions*/
                true);
            }