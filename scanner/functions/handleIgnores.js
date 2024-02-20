function handleIgnores() {
        for (const ignore of options.ignoreWords) {
            if ((0, string_1.matchSubstring)(str, i, ignore)) {
                resolve(new raw_1.Raw(ignore));
                i += ignore.length;
                return true;
            }
        }
        return false;
    }