async function patchAll(registry, registryPath) {
    const patchRoot = path.resolve(__dirname, '..', 'patch');
    const patchStatusFilePath = path.join(patchRoot, 'status.json');
    const patchStatus = await asyncUtils.exists(patchStatusFilePath) ? await jsonc.read(patchStatusFilePath) : { complete: {}, failed: {} }
    patchStatus.failed = {};
    const patchList = await asyncUtils.readdir(patchRoot, { withFileTypes: true });
    await asyncUtils.forEach(patchList, async (patchEntry) => {
        if (patchStatus.complete[patchEntry.name]) {
            console.log(`(*) Patch ${patchEntry.name} already complete.`);
            return;
        }
        if (patchEntry.isDirectory()) {
            try {
                await patch(path.join(patchRoot, patchEntry.name), registry, registryPath);
                patchStatus.complete[patchEntry.name] = true;
            } catch (ex) {
                console.log(`(!) Patch ${patchEntry.name} failed - ${ex}.`);
                patchStatus.failed[patchEntry.name] = JSON.stringify(ex, undefined, 4);
                await asyncUtils.writeFile(patchStatusFilePath, JSON.stringify(patchStatus, undefined, 4))
                throw ex;
            }
        }
    });

    // Write status file for next time
    await asyncUtils.writeFile(patchStatusFilePath, JSON.stringify(patchStatus, undefined, 4))
}