function collectArgumentTypes(types) {
                let result = ArgumentType.Other;
                for (const type of types) {
                    if (isRegExpType(type)) {
                        result |= ArgumentType.RegExp;
                    }
                    else if (isStringType(type)) {
                        result |= ArgumentType.String;
                    }
                }
                return result;
            }