function formatCurrency(value, originalFormat, roundingFunction) {
        var format = originalFormat, symbolIndex = format.indexOf('$'), openParenIndex = format.indexOf('('), plusSignIndex = format.indexOf('+'), minusSignIndex = format.indexOf('-'), space = '', decimalSeparator = '', spliceIndex, output;
        if (format.indexOf('$') === -1) {
            // Use defaults instead of the format provided
            if (cultures[currentCulture].currency.position === 'infix') {
                decimalSeparator = cultures[currentCulture].currency.symbol;
                if (cultures[currentCulture].currency.spaceSeparated) {
                    decimalSeparator = ' ' + decimalSeparator + ' ';
                }
            }
            else if (cultures[currentCulture].currency.spaceSeparated) {
                space = ' ';
            }
        }
        else {
            // check for space before or after currency
            if (format.indexOf(' $') > -1) {
                space = ' ';
                format = format.replace(' $', '');
            }
            else if (format.indexOf('$ ') > -1) {
                space = ' ';
                format = format.replace('$ ', '');
            }
            else {
                format = format.replace('$', '');
            }
        }
        // Format The Number
        output = formatNumber(value, format, roundingFunction, decimalSeparator);
        if (originalFormat.indexOf('$') === -1) {
            // Use defaults instead of the format provided
            switch (cultures[currentCulture].currency.position) {
                case 'postfix':
                    if (output.indexOf(')') > -1) {
                        output = output.split('');
                        output.splice(-1, 0, space + cultures[currentCulture].currency.symbol);
                        output = output.join('');
                    }
                    else {
                        output = output + space + cultures[currentCulture].currency.symbol;
                    }
                    break;
                case 'infix':
                    break;
                case 'prefix':
                    if (output.indexOf('(') > -1 || output.indexOf('-') > -1) {
                        output = output.split('');
                        spliceIndex = Math.max(openParenIndex, minusSignIndex) + 1;
                        output.splice(spliceIndex, 0, cultures[currentCulture].currency.symbol + space);
                        output = output.join('');
                    }
                    else {
                        output = cultures[currentCulture].currency.symbol + space + output;
                    }
                    break;
                default:
                    throw Error('Currency position should be among ["prefix", "infix", "postfix"]');
            }
        }
        else {
            // position the symbol
            if (symbolIndex <= 1) {
                if (output.indexOf('(') > -1 || output.indexOf('+') > -1 || output.indexOf('-') > -1) {
                    output = output.split('');
                    spliceIndex = 1;
                    if (symbolIndex < openParenIndex || symbolIndex < plusSignIndex || symbolIndex < minusSignIndex) {
                        // the symbol appears before the "(", "+" or "-"
                        spliceIndex = 0;
                    }
                    output.splice(spliceIndex, 0, cultures[currentCulture].currency.symbol + space);
                    output = output.join('');
                }
                else {
                    output = cultures[currentCulture].currency.symbol + space + output;
                }
            }
            else {
                if (output.indexOf(')') > -1) {
                    output = output.split('');
                    output.splice(-1, 0, space + cultures[currentCulture].currency.symbol);
                    output = output.join('');
                }
                else {
                    output = output + space + cultures[currentCulture].currency.symbol;
                }
            }
        }
        return output;
    }