function loadDocs() {
    const docs = [];
    files.forEach(f => {
        const filePath = path.resolve(dir, f);
        const contents = fs.readFileSync(filePath, 'utf8');
        try {
            yaml.safeLoadAll(contents, obj => {
                obj.file = f;
                docs.push(obj);
            });
        } catch (ex) {
            docs.push({
                file: f,
                name: 'loaderr',
                err:
                    'Unable to load file [' +
                    f +
                    ']\n' +
                    ex.message +
                    '\n' +
                    ex.stack
            });
        }
    });
    return docs;
}