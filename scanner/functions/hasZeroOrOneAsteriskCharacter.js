function hasZeroOrOneAsteriskCharacter(str) {
            let seenAsterisk = false;
            for (let i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) === 42 /* asterisk */) {
                    if (!seenAsterisk) {
                        seenAsterisk = true;
                    }
                    else {
                        return false;
                    }
                }
            }
            return true;
        }