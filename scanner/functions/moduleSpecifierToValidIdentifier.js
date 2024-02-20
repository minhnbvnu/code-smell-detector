function moduleSpecifierToValidIdentifier(moduleSpecifier, target, forceCapitalize) {
            const baseName = getBaseFileName(removeSuffix(moduleSpecifier, "/index"));
            let res = "";
            let lastCharWasValid = true;
            const firstCharCode = baseName.charCodeAt(0);
            if (isIdentifierStart(firstCharCode, target)) {
                res += String.fromCharCode(firstCharCode);
                if (forceCapitalize) {
                    res = res.toUpperCase();
                }
            }
            else {
                lastCharWasValid = false;
            }
            for (let i = 1; i < baseName.length; i++) {
                const ch = baseName.charCodeAt(i);
                const isValid = isIdentifierPart(ch, target);
                if (isValid) {
                    let char = String.fromCharCode(ch);
                    if (!lastCharWasValid) {
                        char = char.toUpperCase();
                    }
                    res += char;
                }
                lastCharWasValid = isValid;
            }
            return !isStringANonContextualKeyword(res) ? res || "_" : `_${res}`;
        }