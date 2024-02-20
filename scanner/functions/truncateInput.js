function truncateInput(inputValue, rtl) {
                return rtl ? inputValue.replace(new RegExp("^(" + escapeRegex(_buffer.join('')) + ")*"), "") : inputValue.replace(new RegExp("(" + escapeRegex(_buffer.join('')) + ")*$"), "");
            }