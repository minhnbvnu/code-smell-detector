function getOutletState(owner) {
    try {
      // eslint-disable-next-line ember/no-private-routing-service
      return owner.lookup('router:main')._toplevelView.state.ref.value();
    } catch (error) {
      console.log('[Ember Inspector] failed to capture render tree');
      console.log(error);
      return undefined;
    }
  }