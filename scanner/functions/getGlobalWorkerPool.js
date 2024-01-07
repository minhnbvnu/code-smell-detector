function getGlobalWorkerPool() {
    if (!globalWorkerPool) {
        globalWorkerPool = new WorkerPool();
        setWorkerPool(globalWorkerPool);
    }
    return globalWorkerPool;
}