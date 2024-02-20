function pctEncChar(chr) {
            var c = chr.charCodeAt(0);
            var e = void 0;
            if (c < 16)
                e = "%0" + c.toString(16).toUpperCase();
            else if (c < 128)
                e = "%" + c.toString(16).toUpperCase();
            else if (c < 2048)
                e = "%" + (c >> 6 | 192).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
            else
                e = "%" + (c >> 12 | 224).toString(16).toUpperCase() + "%" + (c >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
            return e;
        }