function getWorkerSourcePath() {
    if (typeof window === 'undefined') {
        return null;
    }
    if (!url) {
        const source = compileWorkerSource();
        url = window.URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
        //clear cached worker adapters
        adapters = {};
    }
    return url;
}