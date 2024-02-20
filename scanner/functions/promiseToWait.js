function promiseToWait(timeToWait) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), timeToWait * 1000);
    });
}