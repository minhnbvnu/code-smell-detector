function unescapeStringLiteralText(text) {
        return text.replace(/&(?:#\d+|#x[\da-fA-F]+|[0-9a-zA-Z]+);/g, entity => {
            const item = entity.slice(1, -1);
            if (item[0] === '#') {
                const codePoint = item[1] === 'x'
                    ? parseInt(item.slice(2), 16)
                    : parseInt(item.slice(1), 10);
                return codePoint > 0x10ffff // RangeError: Invalid code point
                    ? entity
                    : String.fromCodePoint(codePoint);
            }
            return xhtml_entities_1.xhtmlEntities[item] || entity;
        });
    }