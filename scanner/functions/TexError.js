function TexError(id, message) {
            var rest = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                rest[_i - 2] = arguments[_i];
            }
            this.id = id;
            this.message = TexError.processString(message, rest);
        }