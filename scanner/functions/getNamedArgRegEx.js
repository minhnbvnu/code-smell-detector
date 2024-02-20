function getNamedArgRegEx(name) {
            if (namedArgRegExCache.has(name)) {
                return namedArgRegExCache.get(name);
            }
            const result = new RegExp(`(\\s${name}\\s*=\\s*)(?:(?:'([^']*)')|(?:"([^"]*)"))`, "im");
            namedArgRegExCache.set(name, result);
            return result;
        }