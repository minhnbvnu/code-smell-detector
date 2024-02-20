function removeMinAndVersionNumbers(fileName) {
            let end = fileName.length;
            for (let pos = end - 1; pos > 0; pos--) {
                let ch = fileName.charCodeAt(pos);
                if (ch >= 48 /* _0 */ && ch <= 57 /* _9 */) {
                    do {
                        --pos;
                        ch = fileName.charCodeAt(pos);
                    } while (pos > 0 && ch >= 48 /* _0 */ && ch <= 57 /* _9 */);
                }
                else if (pos > 4 && (ch === 110 /* n */ || ch === 78 /* N */)) {
                    --pos;
                    ch = fileName.charCodeAt(pos);
                    if (ch !== 105 /* i */ && ch !== 73 /* I */) {
                        break;
                    }
                    --pos;
                    ch = fileName.charCodeAt(pos);
                    if (ch !== 109 /* m */ && ch !== 77 /* M */) {
                        break;
                    }
                    --pos;
                    ch = fileName.charCodeAt(pos);
                }
                else {
                    break;
                }
                if (ch !== 45 /* minus */ && ch !== 46 /* dot */) {
                    break;
                }
                end = pos;
            }
            return end === fileName.length ? fileName : fileName.slice(0, end);
        }