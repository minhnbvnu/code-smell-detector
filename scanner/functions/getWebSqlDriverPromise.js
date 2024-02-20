function getWebSqlDriverPromise(localForageInstance) {
        return getDriverPromise(localForageInstance, localForageInstance.WEBSQL);
    }