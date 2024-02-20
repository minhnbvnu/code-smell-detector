function scriptLoadCallback(){
                if (!google ||
                    !google.charts ||
                    typeof google.charts.setOnLoadCallback !== 'function'){
                    return $q.reject("Google charts library loader not present.");
                }
                
                var deferred = $q.defer();

                google.charts.load(version, options);

                google.charts.setOnLoadCallback(function(){
                    $rootScope.$apply(function(){
                        deferred.resolve(google);
                    });
                });

                return deferred.promise;
            }