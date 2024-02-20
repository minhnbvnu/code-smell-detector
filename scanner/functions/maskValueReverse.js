function maskValueReverse(value, settings) {
        var negative = (value.indexOf("-") > -1 && settings.allowNegative) ? "-" : "",
            valueWithoutSymbol = value.replace(settings.prefix, "").replace(settings.suffix, ""),
            integerPart = valueWithoutSymbol.split(settings.decimal)[0],
            newValue,
            decimalPart = "";

        if (integerPart === "") {
            integerPart = "0";
        }
        newValue = buildIntegerPart(integerPart, negative, settings);

        if (settings.precision > 0) {
            var arr = valueWithoutSymbol.split(settings.decimal);
            if (arr.length > 1) {
                decimalPart = arr[1];
            }
            newValue += settings.decimal + decimalPart;
            var rounded = Number.parseFloat((integerPart + "." + decimalPart)).toFixed(settings.precision);
            var roundedDecimalPart = rounded.toString().split(settings.decimal)[1];
            newValue = newValue.split(settings.decimal)[0] + "." + roundedDecimalPart;
        }

        return setSymbol(newValue, settings);
    }