function isForbidden(variable, reference) {
                if (options.ignoreTypeReferences && isTypeReference(reference)) {
                    return false;
                }
                if (isFunction(variable)) {
                    return options.functions;
                }
                if (isOuterClass(variable, reference)) {
                    return options.classes;
                }
                if (isOuterVariable(variable, reference)) {
                    return options.variables;
                }
                if (isOuterEnum(variable, reference)) {
                    return options.enums;
                }
                if (isTypedef(variable)) {
                    return options.typedefs;
                }
                return true;
            }