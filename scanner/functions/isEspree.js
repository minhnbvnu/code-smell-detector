function isEspree(parser) {
        return !!(parser === espree || parser[parserSymbol] === espree);
    }