function tryDecodeEntities(text) {
                const decoded = decodeEntities(text);
                return decoded === text ? void 0 : decoded;
            }