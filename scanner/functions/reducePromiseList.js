function reducePromiseList(emitter, list, initialValue, params = []) {
    return list.reduce((promise, nextItem) => {
        return promise.then(currentValue => {
            emitter('pre', serialize(currentValue), ...params, nextItem.name);
            return Promise.resolve(nextItem(serialize(currentValue), ...params))
                .then((nextValue) => {
                    if (!Iterable.isIterable(currentValue)) {
                        return assign({}, currentValue, nextValue);
                    }

                    return currentValue.mergeDeep(nextValue);
                })
                .then((nextValue) => {
                    emitter('post', serialize(nextValue), ...params, nextItem.name);

                    return nextValue;
                });
        });
    }, Promise.resolve(initialValue));
}