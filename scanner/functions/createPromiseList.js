function createPromiseList(promises) {
            return new PromiseList(promises, true).promise();
        }