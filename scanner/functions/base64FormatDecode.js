function base64FormatDecode(ch) {
            return ch >= 65 /* A */ && ch <= 90 /* Z */ ? ch - 65 /* A */ : ch >= 97 /* a */ && ch <= 122 /* z */ ? ch - 97 /* a */ + 26 : ch >= 48 /* _0 */ && ch <= 57 /* _9 */ ? ch - 48 /* _0 */ + 52 : ch === 43 /* plus */ ? 62 : ch === 47 /* slash */ ? 63 : -1;
        }