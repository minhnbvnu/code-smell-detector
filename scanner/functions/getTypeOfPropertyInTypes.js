function getTypeOfPropertyInTypes(types, name) {
                    const appendPropType = (propTypes, type) => {
                        var _a3;
                        type = getApparentType(type);
                        const prop = type.flags & 3145728 /* UnionOrIntersection */ ? getPropertyOfUnionOrIntersectionType(type, name) : getPropertyOfObjectType(type, name);
                        const propType = prop && getTypeOfSymbol(prop) || ((_a3 = getApplicableIndexInfoForName(type, name)) == null ? void 0 : _a3.type) || undefinedType;
                        return append(propTypes, propType);
                    };
                    return getUnionType(reduceLeft(types, appendPropType, 
                    /*initial*/
                    void 0) || emptyArray);
                }