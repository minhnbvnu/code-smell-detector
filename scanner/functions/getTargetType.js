function getTargetType(type) {
                return getObjectFlags(type) & 4 /* Reference */ ? type.target : type;
            }