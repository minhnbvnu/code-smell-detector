function createAdapter(key, cb) {
    if (!adapters[key]) {
        console.error(`not find ${key} adapter`);
        return;
    }
    let adapter = adapters[key];
    if (isFunction(adapter)) {
        if (adapter.length === 0) {
            // new definition form of worker source
            adapter = adapter();
        }
    }
    adapter = `(${adapter})`;
    const workerPool = getWorkerPool();
    if (!workerPool) {
        return;
    }
    const workers = workerPool.workers || [];
    if (workers.length === 0) {
        console.error('workerpool workers count is 0');
    }
    let count = 0;
    const messageCB = (msg) => {
        msg = msg.data || {};
        if (msg.adapterName === key) {
            count++;
            if (count === workers.length) {
                workers.forEach(worker => {
                    worker.removeEventListener('message', messageCB);
                });
                delete adapters[key];
                cb();
            }
        }
    };
    workers.forEach(worker => {
        worker.addEventListener('message', messageCB);
        worker.postMessage({ key, code: adapter, messageType: 'createAdapter' });
    });


}