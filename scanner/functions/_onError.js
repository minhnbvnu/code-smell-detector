function _onError(config, error) {
            scope.emit('error', error, serialize(config));
            throw error;
        }