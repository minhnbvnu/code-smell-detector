function getStringFromDB(buffer, start, length) {
        var outstr = '';
        for (var n = start; n < start + length; n++) {
            outstr += String.fromCharCode(buffer.getUint8(n));
        }
        return outstr;
    }