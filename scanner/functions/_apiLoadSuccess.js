function _apiLoadSuccess(g) {
                $google = g;
                _apiReady = true;
                _serviceDeferred.resolve();
                return g;
            }