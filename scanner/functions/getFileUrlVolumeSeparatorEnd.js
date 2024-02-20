function getFileUrlVolumeSeparatorEnd(url, start) {
            const ch0 = url.charCodeAt(start);
            if (ch0 === 58 /* colon */)
                return start + 1;
            if (ch0 === 37 /* percent */ && url.charCodeAt(start + 1) === 51 /* _3 */) {
                const ch2 = url.charCodeAt(start + 2);
                if (ch2 === 97 /* a */ || ch2 === 65 /* A */)
                    return start + 3;
            }
            return -1;
        }