function createGraph(entry) {
    const mainAsset = createAssets(entry);
    const queue = [mainAsset];

    for(const asset of queue){
        const dirname = path.dirname(asset.filename);
        asset.mapping = {};
        asset.dependencies.forEach(relativePath => {
            const absolutePath = path.join(dirname, relativePath);
            const child = createAssets(absolutePath);
            asset.mapping[relativePath] = child.id;
            queue.push(child);
        })
    }

    return queue;
}