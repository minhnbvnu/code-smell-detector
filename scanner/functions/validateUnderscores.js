function validateUnderscores(name) {
        if (name.startsWith('_')) {
            return false;
        }
        let wasUnderscore = false;
        for (let i = 1; i < name.length; ++i) {
            if (name[i] === '_') {
                if (wasUnderscore) {
                    return false;
                }
                wasUnderscore = true;
            }
            else {
                wasUnderscore = false;
            }
        }
        return !wasUnderscore;
    }