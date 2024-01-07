function pushAdapterCreated(workerKey) {
    if (!adapterHasCreated(workerKey)) {
        ADAPTER_CREATED_LIST.push(workerKey);
    }
}