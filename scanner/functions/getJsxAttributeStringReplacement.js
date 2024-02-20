function getJsxAttributeStringReplacement(c) {
            if (c.charCodeAt(0) === 0 /* nullCharacter */) {
                return "&#0;";
            }
            return jsxEscapedCharsMap.get(c) || encodeJsxCharacterEntity(c.charCodeAt(0));
        }