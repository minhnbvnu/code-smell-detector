function _generateRequestConfig(method, data, params, headers) {
            let config = Map({
                errorInterceptors: List(scope.get('errorInterceptors')),
                headers: Map(scope.get('headers')).mergeDeep(Map(headers)),
                method,
                params,
                requestInterceptors: List(scope.get('requestInterceptors')),
                responseInterceptors: List(scope.get('responseInterceptors')),
                url: scope.get('url'),
            });

            if (data) {
                if (!config.hasIn(['headers', 'Content-Type'])) {
                    config = config.setIn(['headers', 'Content-Type'], 'application/json;charset=UTF-8');
                }

                config = config.set('data', fromJS(data));
            }

            return config;
        }