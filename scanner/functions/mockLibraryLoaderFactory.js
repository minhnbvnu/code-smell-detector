function mockLibraryLoaderFactory($q, mockGoogleApi) {
                var deferred = $q.defer();
                mockLibraryLoaderBackend = {
                    succeed: function() {
                        deferred.resolve(mockGoogleApi);
                    },
                    fail: function(reason) {
                        deferred.reject(reason);
                    }
                };
                return deferred.promise;
            }