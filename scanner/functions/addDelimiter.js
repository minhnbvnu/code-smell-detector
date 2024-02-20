function addDelimiter(parser, cs, char, attr) {
            var handlers = parser.configuration.handlers;
            var handler = handlers.retrieve(NewcommandUtil.NEW_DELIMITER);
            handler.add(cs, new Symbol_js_1.Symbol(cs, char, attr));
        }