function targetFor(name) {
        return hasOwn(redirect, name) ? redirect[name] : catchall;
    }