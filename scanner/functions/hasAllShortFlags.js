function hasAllShortFlags(arg) {
                if (arg.match(negative) || !arg.match(/^-[^-]+/)) {
                    return false;
                }
                let hasAllFlags = true;
                let next;
                const letters = arg.slice(1).split('');
                for (let j = 0; j < letters.length; j++) {
                    next = arg.slice(j + 2);
                    if (!hasAnyFlag(letters[j])) {
                        hasAllFlags = false;
                        break;
                    }
                    if ((letters[j + 1] && letters[j + 1] === '=') ||
                        next === '-' ||
                        (/[A-Za-z]/.test(letters[j]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) ||
                        (letters[j + 1] && letters[j + 1].match(/\W/))) {
                        break;
                    }
                }
                return hasAllFlags;
            }