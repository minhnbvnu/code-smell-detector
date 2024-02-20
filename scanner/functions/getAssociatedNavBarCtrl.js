function getAssociatedNavBarCtrl() {
    if (navBarDelegate) {
      for (var x = 0; x < $ionicNavBarDelegate._instances.length; x++) {
        if ($ionicNavBarDelegate._instances[x].$$delegateHandle == navBarDelegate) {
          return $ionicNavBarDelegate._instances[x];
        }
      }
    }
    return $element.inheritedData('$ionNavBarController');
  }