function removePendingReq() {
        var idx = $http.pendingRequests.indexOf(config);
        if (idx !== -1) $http.pendingRequests.splice(idx, 1);
      }