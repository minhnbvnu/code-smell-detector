function formatPercentage(value, format, roundingFunction) {
        var space = '', output;
        value = value * 100;
        // check for space before %
        if (format.indexOf(' %') > -1) {
            space = ' ';
            format = format.replace(' %', '');
        }
        else {
            format = format.replace('%', '');
        }
        output = formatNumber(value, format, roundingFunction);
        if (output.indexOf(')') > -1) {
            output = output.split('');
            output.splice(-1, 0, space + '%');
            output = output.join('');
        }
        else {
            output = output + space + '%';
        }
        return output;
    }