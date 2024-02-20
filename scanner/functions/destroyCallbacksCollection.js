function destroyCallbacksCollection(node) {
        ko.utils.domData.set(node, domDataKey, undefined);
    }