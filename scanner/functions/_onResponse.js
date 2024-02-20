function _onResponse(config, rawResponse) {
            const response = responseFactory(rawResponse, endpoint);
            scope.emit('response', response, serialize(config));
            return response;
        }