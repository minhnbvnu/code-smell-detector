function assembleSymbol(args) {
            var name = args[0];
            var char = args[1];
            var attrs = {};
            for (var i = 2; i < args.length; i = i + 2) {
                attrs[args[i]] = args[i + 1];
            }
            return new Symbol_js_1.Symbol(name, char, attrs);
        }