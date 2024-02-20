function lastOrUndefined(array) {
            return array === void 0 || array.length === 0 ? void 0 : array[array.length - 1];
        }