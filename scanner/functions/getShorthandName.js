function getShorthandName(fullname, prefix) {
        if (fullname[0] === "@") {
            let matchResult = new RegExp(`^(@[^/]+)/${prefix}$`, "u").exec(fullname);
            if (matchResult) {
                return matchResult[1];
            }
            matchResult = new RegExp(`^(@[^/]+)/${prefix}-(.+)$`, "u").exec(fullname);
            if (matchResult) {
                return `${matchResult[1]}/${matchResult[2]}`;
            }
        }
        else if (fullname.startsWith(`${prefix}-`)) {
            return fullname.slice(prefix.length + 1);
        }
        return fullname;
    }