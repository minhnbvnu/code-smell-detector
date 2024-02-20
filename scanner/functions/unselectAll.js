function unselectAll() {
                //traverse steps array and set each "selected" property to false
                angular.forEach($scope.getEnabledSteps(), function (step) {
                    step.selected = false;
                });
                //set selectedStep variable to null
                $scope.selectedStep = null;
            }