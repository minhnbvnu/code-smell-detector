function read_operator(prefix) {
                function grow(op) {
                    if (!peek())
                        return op;
                    var bigger = op + peek();
                    if (OPERATORS.has(bigger)) {
                        next();
                        return grow(bigger);
                    }
                    else {
                        return op;
                    }
                }
                return token("operator", grow(prefix || next()));
            }