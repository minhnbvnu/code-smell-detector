function toFixedLarge(value, precision) {
        var mantissa, beforeDec, afterDec, exponent, str;
        str = value.toString();
        mantissa = str.split('e')[0];
        exponent = str.split('e')[1];
        beforeDec = mantissa.split('.')[0];
        afterDec = mantissa.split('.')[1] || '';
        str = beforeDec + afterDec + zeroes(exponent - afterDec.length);
        if (precision > 0) {
            str += '.' + zeroes(precision);
        }
        return str;
    }