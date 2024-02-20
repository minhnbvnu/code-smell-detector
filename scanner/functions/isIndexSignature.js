function isIndexSignature() {
                        return token() === 22 /* OpenBracketToken */ && lookAhead(isUnambiguouslyIndexSignature);
                    }