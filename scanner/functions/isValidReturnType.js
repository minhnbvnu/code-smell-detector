function isValidReturnType(tag) {
                return tag.type === null || tag.type.name === "void" || tag.type.type === "UndefinedLiteral";
            }