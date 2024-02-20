function addWithFunction(list, item, hashFunction) {
        if (findWithFunction(list, hashFunction) === -1) {
            list.push(item);
        }
    }