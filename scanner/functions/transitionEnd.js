function transitionEnd() {
      for (var x = 0; x < headerBars.length; x++) {
        headerBars[x].isActive = false;
      }
      enteringHeaderBar.isActive = true;

      navBarAttr(enteringHeaderBar, 'active');
      navBarAttr(leavingHeaderBar, 'cached');

      self.activeTransition = navBarTransition = queuedTransitionEnd = null;
    }