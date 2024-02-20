function writeTokenText(token, writer2, pos) {
                const tokenString = tokenToString(token);
                writer2(tokenString);
                return pos < 0 ? pos : pos + tokenString.length;
            }