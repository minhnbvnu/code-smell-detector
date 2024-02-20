function simpleValueHandler(me, val, valprops, encoder, adder) {
        var result;

        if (valprops.isArr) {
            result = arrayToString(val, encoder, me.maxLength);
        } else if (valprops.isObj) {
            result = objectToString(val, encoder, me.maxLength);
        } else {
            var buffer = new Buffer(me.maxLength);
            result = buffer.append(val, encoder).str;
        }

        adder("", result);
    }