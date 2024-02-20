function encodeJsxCharacterEntity(charCode) {
            const hexCharCode = charCode.toString(16).toUpperCase();
            return "&#x" + hexCharCode + ";";
        }