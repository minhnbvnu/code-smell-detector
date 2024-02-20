function canExitStep(step, stepTo) {
                var defer,
                    canExit;
                //Exiting the step should be allowed if no validation function was provided or if the user is moving backwards
                if(typeof(step.canexit) === 'undefined' || $scope.getStepNumber(stepTo) < $scope.currentStepNumber()){
                    return true;
                }
                //If canexit is a boolean value instead of a function, return the value
                if(typeof step.canexit === 'boolean'){
                    return step.canexit;
                }
                //Check to see if the canexit function is a promise which needs to be returned
                canExit = step.canexit($scope.context);
                if(angular.isFunction(canExit.then)){
                    defer = $q.defer();
                    canExit.then(function(response){
                        defer.resolve(response);
                    });
                    return defer.promise;
                } else {
                    return canExit === true;
                }
            }