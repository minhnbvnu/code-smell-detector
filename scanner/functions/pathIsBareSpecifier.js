function pathIsBareSpecifier(path) {
            return !pathIsAbsolute(path) && !pathIsRelative(path);
        }