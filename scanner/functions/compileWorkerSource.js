function compileWorkerSource() {
    let source = header;
    for (const p in adapters) {
        let adapter = adapters[p];
        pushAdapterCreated(p);
        if (isFunction(adapter)) {
            if (adapter.length === 0) {
                // new definition form of worker source
                adapter = adapter();
            }
        }
        source += `
    workerExports = {};
    (${adapter})(workerExports, self);
    adapters['${p}'] = workerExports`;
        source += `
    workerExports.initialize && workerExports.initialize(self);
        `;

    }
    source += footer;
    return source;
}