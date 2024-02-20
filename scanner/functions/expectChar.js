function expectChar(arg, msg) {
            if (parserInput.$char(arg)) {
                return arg;
            }
            error(msg || "expected '" + arg + "' got '" + parserInput.currentChar() + "'");
        }