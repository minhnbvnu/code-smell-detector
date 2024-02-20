function executeRefreshSettings() {
      Settings.query(function (data) {
        $rootScope.settings = data;
        for (let key in data) {
          $rootScope.settings[data[key]['setting_name']] = data[key]['setting_value'];
        }
        if ($rootScope.settings['refresh_time'] !== '-1' && $rootScope.settings['refresh_time'] !== undefined) {
          configcheck = $interval(getRasaStatus, Number($rootScope.settings['refresh_time']));
        }
        getRasaStatus();
      });
    }