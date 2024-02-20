function hasInTotal(path) {
    let count = 0;

    const keyFile = new GLib.KeyFile();
    keyFile.load_from_file(path, 0);

    const [groups] = keyFile.get_groups();

    groups.forEach(group => {
        const [keys] = keyFile.get_keys(group);

        keys.forEach(key => {
            const values = keyFile.get_value(group, key);
            count += values.split(';').length;
        });
    });

    return count;
}