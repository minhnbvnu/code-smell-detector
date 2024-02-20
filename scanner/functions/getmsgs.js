function getmsgs() {
        new EventSource("/dashboard/getmessages").onmessage = function (event) {
            $scope.Msgs = JSON.parse(event.data);
            $scope.$apply();
        };
        new EventSource("/msg/GetUnreadMsgs").onmessage = function (event) {
            $scope.InternalMsgs = JSON.parse(event.data);
            $scope.$apply();
        };
    }