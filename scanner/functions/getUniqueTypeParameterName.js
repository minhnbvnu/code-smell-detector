function getUniqueTypeParameterName(typeParameters, baseName) {
                let len = baseName.length;
                while (len > 1 && baseName.charCodeAt(len - 1) >= 48 /* _0 */ && baseName.charCodeAt(len - 1) <= 57 /* _9 */)
                    len--;
                const s = baseName.slice(0, len);
                for (let index = 1; true; index++) {
                    const augmentedName = s + index;
                    if (!hasTypeParameterByName(typeParameters, augmentedName)) {
                        return augmentedName;
                    }
                }
            }