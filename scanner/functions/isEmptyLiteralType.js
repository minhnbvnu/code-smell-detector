function isEmptyLiteralType(type) {
                return strictNullChecks ? type === implicitNeverType : type === undefinedWideningType;
            }