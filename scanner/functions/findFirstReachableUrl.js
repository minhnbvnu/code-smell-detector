function findFirstReachableUrl(urls, tail) {
    var d = $q.defer();
    if (urls.length > 0) {
      var t = tail ? tail : "";
      //$ionicLoading.show({template: 'trying ' + urls[0].server});
      NVR.log("zmWizard test.." + urls[0] + t);
       return $http.get(urls[0] + t).then(function (succ) {
        NVR.log("Success:  on " + urls[0] + t);
        //NVR.log (JSON.stringify(succ));
        //$ionicLoading.hide();
        d.resolve(urls[0]);
        return d.promise;
        //return urls[0];
      }, function (err) {
        NVR.log("zmWizard:Failed on " + urls[0] + t + " with error " + JSON.stringify(err));
        // this is actually a success - I might get empty status
        // or something
        if (err.status < 300) {
          NVR.log("A 2xx is a success, I think - " + urls[0]);
          d.resolve(urls[0]);
          return d.promise;
        }

        return findFirstReachableUrl(urls.slice(1), tail);
      });
    } else {
      // $ionicLoading.hide();
      NVR.log("zmWizard: findFirst returned no success");
      d.reject("No reachable URL");
      return d.promise;
    }

    return d.promise;
  }