function recombineUnknownType(type) {
                return type === unknownUnionType ? unknownType : type;
            }