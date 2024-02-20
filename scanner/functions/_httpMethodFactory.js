function _httpMethodFactory(method, expectData = true) {
            const emitter = (...args) => {
                scope.emit(...args);
            };

            if (expectData) {
                return (data, params = null, headers = null) => {
                    const config = _generateRequestConfig(method, data, params, headers);
                    return request(config, emitter).then(
                        (rawResponse) => _onResponse(config, rawResponse),
                        (rawResponse) => _onError(config, rawResponse)
                    );
                };
            }

            return (params = null, headers = null) => {
                const config = _generateRequestConfig(method, null, params, headers);
                return request(config, emitter).then(
                    (rawResponse) => _onResponse(config, rawResponse),
                    (error) => _onError(config, error)
                );
            };
        }