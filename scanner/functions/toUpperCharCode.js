function toUpperCharCode(charCode) {
            if (97 /* a */ <= charCode && charCode <= 122 /* z */) {
                return charCode - 32;
            }
            return charCode;
        }