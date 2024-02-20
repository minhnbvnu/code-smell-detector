function addMacro(parser, cs, func, attr, symbol) {
            if (symbol === void 0) {
                symbol = '';
            }
            var handlers = parser.configuration.handlers;
            var handler = handlers.retrieve(NewcommandUtil.NEW_COMMAND);
            handler.add(cs, new Symbol_js_1.Macro(symbol ? symbol : cs, func, attr));
        }