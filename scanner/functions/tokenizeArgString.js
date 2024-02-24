function tokenizeArgString(argString) {
        if (Array.isArray(argString)) {
            return argString.map(e => typeof e !== 'string' ? e + '' : e);
        }
        argString = argString.trim();
        let i = 0;
        let prevC = null;
        let c = null;
        let opening = null;
        const args = [];
        for (let ii = 0; ii < argString.length; ii++) {
            prevC = c;
            c = argString.charAt(ii);
            if (c === ' ' && !opening) {
                if (!(prevC === ' ')) {
                    i++;
                }
                continue;
            }
            if (c === opening) {
                opening = null;
            }
            else if ((c === "'" || c === '"') && !opening) {
                opening = c;
            }
            if (!args[i])
                args[i] = '';
            args[i] += c;
        }
        return args;
    }