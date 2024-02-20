function checkTypeNameIsReserved(name, message) {
                switch (name.escapedText) {
                    case "any":
                    case "unknown":
                    case "never":
                    case "number":
                    case "bigint":
                    case "boolean":
                    case "string":
                    case "symbol":
                    case "void":
                    case "object":
                        error(name, message, name.escapedText);
                }
            }