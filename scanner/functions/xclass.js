function xclass() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key]
            }
            return args.filter(function(a) {
                return !!a
            }).join(" ").trim()
        }