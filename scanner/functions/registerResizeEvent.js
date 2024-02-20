function registerResizeEvent($rootScope, $window){
        angular.element($window).on('resize', function () {
                $rootScope.$emit('resizeMsg');
            });
    }