function maskValueStandard(value, settings) {
        var negative = (value.indexOf("-") > -1 && settings.allowNegative) ? "-" : "",
            onlyNumbers = value.replace(/[^0-9]/g, ""),
            integerPart = onlyNumbers.slice(0, onlyNumbers.length - settings.precision),
            newValue,
            decimalPart,
            leadingZeros;

        newValue = buildIntegerPart(integerPart, negative, settings);

        if (settings.precision > 0) {
            if(!isNaN(value) && value.indexOf(".")){
                var precision = value.substr(value.indexOf(".") + 1);
                onlyNumbers += new Array((settings.precision + 1) - precision.length).join(0);
                integerPart = onlyNumbers.slice(0, onlyNumbers.length - settings.precision);
                newValue = buildIntegerPart(integerPart, negative, settings);
            }

            decimalPart = onlyNumbers.slice(onlyNumbers.length - settings.precision);
            leadingZeros = new Array((settings.precision + 1) - decimalPart.length).join(0);
            newValue += settings.decimal + leadingZeros + decimalPart;
        }
        return setSymbol(newValue, settings);
    }