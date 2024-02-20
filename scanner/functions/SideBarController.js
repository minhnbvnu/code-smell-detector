function SideBarController($rootScope, $scope) {
    $scope.logout = function () {
        $rootScope.$broadcast("INVALID_JWT_TOKEN");
    };
}