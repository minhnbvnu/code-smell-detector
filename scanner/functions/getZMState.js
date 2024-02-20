function getZMState() {
        var d = $q.defer();
        var apiurl = loginData.apiurl+'/states.json?'+$rootScope.authSession;
        $http.get(apiurl)
        .then (function (data) {
          data = data.data;
          /*
          {"states":[{"State":{"Id":"4","Name":"default","Definition":"2:Mocord:1,3:Mocord:1,4:Mocord:1,5:Monitor:0,6:Monitor:0,7:Modect:1,8:Modect:1","IsActive":"1"}},{"State":{"Id":"5","Name":"test","Definition":"2:None:1,3:None:1,4:None:1,5:Monitor:1,6:Monitor:1,7:Modect:1,8:Modect:1","IsActive":"0"}}]}
          */
          var currentState = 'unknown';

          for (var i=0; i < data.states.length; i++ ) {
            if (data.states[i].State.IsActive == '1') {
              currentState = data.states[i].State.Name;
              break;
            }
          }
          if (loginData.currentZMState != currentState) {
            debug ('ZM State Change: ZM State changed from:'+loginData.currentZMState+' to:'+currentState+' resetting cache...');
            delete_all_caches()
            .then(function(data) {
              loginData.currentZMState = currentState;
              loginData.currentMontageProfile = '';
              //loginData.packeryPositionsArray = {};
              loginData.packeryPositions= undefined;

              setLogin(loginData)
              .then (function(v) {
                d.resolve(data);
                //$rootScope.$broadcast('zm-state-change');
                proceedWithFreshLogin(true);
                return d.promise;
              });
            });
          } else {
            debug ('ZM State has not changed, still at '+loginData.currentZMState);
            setLogin(loginData)
            .then (function (v) {
              d.resolve(data);
              return d.promise;
            });
          }
          return d.promise;
        }, function (err) {
          debug('Error parsing State API:'+JSON.stringify(err));
          d.resolve(err);
          return d.promise;
        });
        return d.promise;
      }