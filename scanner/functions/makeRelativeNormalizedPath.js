function makeRelativeNormalizedPath(str, sep) {
    const parsed = parsePath(str);
    let root = parsed.root;
    let dir;
    let file = parsed.base;
    let quoted;
    let pos;

    // handle a weird windows case separately
    if (sep === '\\') {
        pos = root.indexOf(':\\');
        if (pos >= 0) {
            root = root.substring(0, pos + 2);
        }
    }
    dir = parsed.dir.substring(root.length);

    if (str === '') {
        return [];
    }

    if (sep !== '/') {
        quoted = new RegExp(sep.replace(/\W/g, '\\$&'), 'g');
        dir = dir.replace(quoted, '/');
        file = file.replace(quoted, '/'); // excessively paranoid?
    }

    if (dir !== '') {
        dir = `${dir}/${file}`;
    } else {
        dir = file;
    }
    if (dir.substring(0, 1) === '/') {
        dir = dir.substring(1);
    }
    dir = dir.split(/\/+/);
    return dir;
}