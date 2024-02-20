function checkRequestIsValid(worker, action) {
    if (!ifcWorker[worker]) {
        throw new Error(`The worker ${worker} does not exist.`);
    }
    const requestedWorker = ifcWorker[worker];
    if (!requestedWorker[action]) {
        throw new Error(`The action ${action} does not exist in the worker ${worker}.`);
    }
}