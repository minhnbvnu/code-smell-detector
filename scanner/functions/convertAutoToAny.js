function convertAutoToAny(type) {
                return type === autoType ? anyType : type === autoArrayType ? anyArrayType : type;
            }