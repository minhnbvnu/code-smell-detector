function addEnvironment(parser, env, func, attr) {
            var handlers = parser.configuration.handlers;
            var handler = handlers.retrieve(NewcommandUtil.NEW_ENVIRONMENT);
            handler.add(env, new Symbol_js_1.Macro(env, func, attr));
        }