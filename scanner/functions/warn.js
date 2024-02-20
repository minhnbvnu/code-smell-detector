function warn(oldMethod, newMethod) {
    $log.warn('$ionicViewService' + oldMethod + ' is deprecated, please use $ionicHistory' + newMethod + ' instead: http://ionicframework.com/docs/nightly/api/service/$ionicHistory/');
  }