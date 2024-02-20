function isDiskPathRoot(path) {
            const rootLength = getEncodedRootLength(path);
            return rootLength > 0 && rootLength === path.length;
        }