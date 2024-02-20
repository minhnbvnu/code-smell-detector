function getDriverPromise(localForageInstance, driverName) {
        getDriverPromise.result = getDriverPromise.result || {};
        if (getDriverPromise.result[driverName]) {
            return getDriverPromise.result[driverName];
        }
        if (!localForageInstance || typeof localForageInstance.getDriver !== 'function') {
            return Promise.reject(new Error('localforage.getDriver() was not available! ' + 'localforage v1.4+ is required!'));
        }
        getDriverPromise.result[driverName] = localForageInstance.getDriver(driverName);
        return getDriverPromise.result[driverName];
    }