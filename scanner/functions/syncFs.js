function syncFs(fs) {
    const fns = ['mkdir', 'realpath', 'stat', 'rmdir', 'utimes'];
    const obj = {};

    // Create the sync versions of the methods that we need
    fns.forEach((name) => {
        obj[name] = makeSync(fs, name);
    });

    // Copy the rest of the functions
    for (const key in fs) {
        if (!obj[key]) {
            obj[key] = fs[key];
        }
    }

    return obj;
}