function diagnosticName(nameArg) {
                return isString(nameArg) ? unescapeLeadingUnderscores(nameArg) : declarationNameToString(nameArg);
            }