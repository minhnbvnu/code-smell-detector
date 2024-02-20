function getRootLength(path) {
            const rootLength = getEncodedRootLength(path);
            return rootLength < 0 ? ~rootLength : rootLength;
        }