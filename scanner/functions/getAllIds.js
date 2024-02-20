function getAllIds(){
    var defer = $q.defer();
    var locNotifIds = [];
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
      if (localStorage.key( i ).indexOf(storageKeyPfx) > -1)
        locNotifIds.push(parseInt(localStorage.key( i ).split("-")[1]));
    }
    defer.resolve(locNotifIds);
    return defer.promise;
  }