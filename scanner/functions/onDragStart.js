function onDragStart(ev) {
      if (!isPrimary || !$ionicConfig.views.swipeBackEnabled() || $ionicSideMenuDelegate.isOpenRight() ) return;


      startDragX = getDragX(ev);
      if (startDragX > swipeBackHitWidth) return;

      backView = $ionicHistory.backView();

      var currentView = $ionicHistory.currentView();

      if (!backView || backView.historyId !== currentView.historyId || currentView.canSwipeBack === false) return;

      if (!windowWidth) windowWidth = window.innerWidth;

      self.isSwipeFreeze = $ionicScrollDelegate.freezeAllScrolls(true);

      var registerData = {
        direction: 'back'
      };

      dragPoints = [];

      cancelData = {
        showBar: self.showBar(),
        showBackButton: self.showBackButton()
      };

      var switcher = $ionicViewSwitcher.create(self, registerData, backView, currentView, true, false);
      switcher.loadViewElements(registerData);
      switcher.render(registerData);

      viewTransition = switcher.transition('back', $ionicHistory.enabledBack(backView), true);

      associatedNavBarCtrl = getAssociatedNavBarCtrl();

      deregDrag = ionic.onGesture('drag', onDrag, $element[0]);
      deregRelease = ionic.onGesture('release', onRelease, $element[0]);
    }