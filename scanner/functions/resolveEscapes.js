function resolveEscapes(character) {
                switch (character) {
                    case "\n":
                    case "\\\n":
                        return "\\n";
                    case "\r":
                    case "\\\r":
                        return "\\r";
                    case "\t":
                    case "\\\t":
                        return "\\t";
                    case "\v":
                    case "\\\v":
                        return "\\v";
                    case "\f":
                    case "\\\f":
                        return "\\f";
                    case "/":
                        return "\\/";
                    default:
                        return null;
                }
            }