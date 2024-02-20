function setLogin(newLogin) {
        // if we are here, we should remove cache
        loginData = angular.copy(newLogin);
       //console.log ('****** SET LOGIN:'+JSON.stringify(loginData));
        $rootScope.LoginData = loginData;
        serverGroupList[loginData.serverName] = angular.copy(loginData);

        return localforage.setItem("serverGroupList", encrypt(serverGroupList))
          .then(function () {
            return localforage.setItem("defaultServerName", loginData.serverName);
          })
          .then(function () {
            return localforage.removeItem("settings-temp-data");
          })
          .catch(function (err) {
            log("SetLogin localforage store error " + JSON.stringify(err));
            return ('error');
          });
      }