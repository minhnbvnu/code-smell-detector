function internalMath(parser, text, level, mathvariant) {
        var config = parser.configuration.packageData.get('textmacros');
        if (!(parser instanceof TextParser_js_1.TextParser)) {
            config.texParser = parser;
        }
        return [(new TextParser_js_1.TextParser(text, mathvariant ? { mathvariant: mathvariant } : {}, config.parseOptions, level)).mml()];
    }