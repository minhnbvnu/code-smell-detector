function getEventObject(eid) {

      var apiurl = NVR.getLogin().apiurl + '/events/' + eid + '.json?'+$rootScope.authSession;

      $http.get(apiurl)
        .then(function (data) {},
          function (err) {});

    }