async function deleteOldDdocs(dest) {
    const oldDdocs = await glob(path_1.default.join(dest, '**/*.json'));
    return Promise.all(oldDdocs.map(file => unlink(file)));
}