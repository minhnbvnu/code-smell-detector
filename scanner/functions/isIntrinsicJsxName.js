function isIntrinsicJsxName(name) {
            const ch = name.charCodeAt(0);
            return ch >= 97 /* a */ && ch <= 122 /* z */ || stringContains(name, "-") || stringContains(name, ":");
        }