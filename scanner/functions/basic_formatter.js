function basic_formatter(value, _format, _special_vars) {
        if ((0, types_1.isNumber)(value)) {
            const format = (() => {
                switch (false) {
                    case Math.floor(value) != value:
                        return "%d";
                    case !(Math.abs(value) > 0.1) || !(Math.abs(value) < 1000):
                        return "%0.3f";
                    default:
                        return "%0.3e";
                }
            })();
            return sprintf(format, value);
        }
        else
            return `${value}`; // get strings for categorical types
    }