function pathComponents(path, rootLength) {
            const root = path.substring(0, rootLength);
            const rest = path.substring(rootLength).split(directorySeparator);
            if (rest.length && !lastOrUndefined(rest))
                rest.pop();
            return [root, ...rest];
        }