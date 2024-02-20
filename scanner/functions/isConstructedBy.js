function isConstructedBy(source, target) {
                        if (source.flags & 524288 /* Object */ && getObjectFlags(source) & 1 /* Class */ || target.flags & 524288 /* Object */ && getObjectFlags(target) & 1 /* Class */) {
                            return source.symbol === target.symbol;
                        }
                        return isTypeSubtypeOf(source, target);
                    }