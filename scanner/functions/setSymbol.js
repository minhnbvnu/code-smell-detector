function setSymbol(value, settings) {
        var operator = "";
        if (value.indexOf("-") > -1) {
            value = value.replace("-", "");
            operator = "-";
        }
        if (value.indexOf(settings.prefix) > -1) {
            value = value.replace(settings.prefix, "");
        }
        if (value.indexOf(settings.suffix) > -1) {
            value = value.replace(settings.suffix, "");
        }
        return operator + settings.prefix + value + settings.suffix;
    }