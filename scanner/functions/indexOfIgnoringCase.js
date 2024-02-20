function indexOfIgnoringCase(str, value) {
            const n = str.length - value.length;
            for (let start = 0; start <= n; start++) {
                if (every2(value, (valueChar, i) => toLowerCase2(str.charCodeAt(i + start)) === valueChar)) {
                    return start;
                }
            }
            return -1;
        }