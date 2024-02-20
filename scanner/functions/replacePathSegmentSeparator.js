function replacePathSegmentSeparator(filepath, separator) {
        return filepath.split(/[/\\]/).join(separator);
    }