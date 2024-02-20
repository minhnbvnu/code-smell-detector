function listen() {
      listener = listener || $rootScope.$on('$locationChangeSuccess', update);
      return listener;
    }