function getObjectId(object) {
        // first check old-style name
        let name = object.name;
        if (!name) {
            if (!object.meta) {
                return null;
            }
            name = object.meta.name;
            if (!name) {
                return null;
            }
        }
        // now check for old-style version
        let version = object.version;
        if (!version) {
            version = object.meta && object.meta.version;
        }
        // if there's a version then append that
        if (version) {
            return `${name}@${version}`;
        }
        return name;
    }