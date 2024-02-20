function base64FormatEncode(value) {
            return value >= 0 && value < 26 ? 65 /* A */ + value : value >= 26 && value < 52 ? 97 /* a */ + value - 26 : value >= 52 && value < 62 ? 48 /* _0 */ + value - 52 : value === 62 ? 43 /* plus */ : value === 63 ? 47 /* slash */ : Debug.fail(`${value}: not a base64 value`);
        }