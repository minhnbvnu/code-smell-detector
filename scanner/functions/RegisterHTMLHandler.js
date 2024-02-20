function RegisterHTMLHandler(adaptor) {
        var handler = new HTMLHandler_js_1.HTMLHandler(adaptor);
        mathjax_js_1.mathjax.handlers.register(handler);
        return handler;
    }