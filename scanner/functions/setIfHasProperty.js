function setIfHasProperty(src, dst, propName, force) {
        if (src && dst && propName) {
            const ok = force || hasProperty(src, propName);
            if (ok) {
                dst[propName] = src[propName];
            }
        }
    }