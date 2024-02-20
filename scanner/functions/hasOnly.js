function hasOnly(path, group, key, value) {
    const keyFile = new GLib.KeyFile();
    keyFile.load_from_file(path, 0);

    const [keys] = keyFile.get_keys(group);
    const values = keyFile.get_value(group, key);
    const list = values.split(';');

    return keys.length === 1 && list.length === 1 && list.indexOf(value) !== -1;
}