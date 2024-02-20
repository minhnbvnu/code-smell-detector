function pathIsRelative(path) {
            return /^\.\.?($|[\\/])/.test(path);
        }