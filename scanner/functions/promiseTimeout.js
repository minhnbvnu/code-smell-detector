function promiseTimeout(fn, timeout) {
    return Promise.race([
        Promise.resolve(fn),
        new Promise(resolve => {
            setTimeout(() => {
                resolve(`Promise timed out after ${timeout} ms`);
            }, timeout);
        })
    ]);
}