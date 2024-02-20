function isJSLiteralType(type) {
                if (noImplicitAny) {
                    return false;
                }
                if (getObjectFlags(type) & 4096 /* JSLiteral */) {
                    return true;
                }
                if (type.flags & 1048576 /* Union */) {
                    return every(type.types, isJSLiteralType);
                }
                if (type.flags & 2097152 /* Intersection */) {
                    return some(type.types, isJSLiteralType);
                }
                if (type.flags & 465829888 /* Instantiable */) {
                    const constraint = getResolvedBaseConstraint(type);
                    return constraint !== type && isJSLiteralType(constraint);
                }
                return false;
            }