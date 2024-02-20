function formatNumbro(value, format, roundingFunction) {
        var output;
        // TODO: do something with `language`
        // figure out what kind of format we are dealing with
        if (format.indexOf('$') > -1) { // currency!!!!!
            output = formatCurrency(value, format, roundingFunction);
        }
        else if (format.indexOf('%') > -1) { // percentage
            output = formatPercentage(value, format, roundingFunction);
        }
        else if (format.indexOf(':') > -1) { // time
            output = formatTime(value);
        }
        else { // plain ol' numbers or bytes
            output = formatNumber(value, format, roundingFunction);
        }
        // return string
        return output;
    }