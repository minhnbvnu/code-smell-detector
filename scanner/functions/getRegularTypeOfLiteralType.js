function getRegularTypeOfLiteralType(type) {
                return type.flags & 2976 /* Freshable */ ? type.regularType : type.flags & 1048576 /* Union */ ? type.regularType || (type.regularType = mapType(type, getRegularTypeOfLiteralType)) : type;
            }