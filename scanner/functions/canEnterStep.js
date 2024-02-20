function canEnterStep(step) {
                var defer,
                    canEnter;
                //If no validation function is provided, allow the user to enter the step
                if(step.canenter === undefined){
                    return true;
                }
                //If canenter is a boolean value instead of a function, return the value
                if(typeof step.canenter === 'boolean'){
                    return step.canenter;
                }
                //Check to see if the canenter function is a promise which needs to be returned
                canEnter = step.canenter($scope.context);
                if(angular.isFunction(canEnter.then)){
                    defer = $q.defer();
                    canEnter.then(function(response){
                        defer.resolve(response);
                    });
                    return defer.promise;
                } else {
                    return canEnter === true;
                }
            }