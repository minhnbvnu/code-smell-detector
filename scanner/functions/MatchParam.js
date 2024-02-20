function MatchParam(parser, param) {
            if (parser.string.substr(parser.i, param.length) !== param) {
                return 0;
            }
            if (param.match(/\\[a-z]+$/i) &&
                parser.string.charAt(parser.i + param.length).match(/[a-z]/i)) {
                return 0;
            }
            parser.i += param.length;
            return 1;
        }