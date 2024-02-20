function mapEcmaVersion(version) {
        if (version == null || version === 3 || version === 5) {
            return 'es5';
        }
        const year = version > 2000 ? version : 2015 + (version - 6);
        const lib = `es${year}`;
        return lib in lib_1.lib ? lib : year > 2020 ? 'esnext' : 'es5';
    }