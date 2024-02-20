function _checkIfDirtyOfView(viewEl) {
    if (!viewEl) return false;
    const viewVue = viewEl.__vue__;
    return viewVue && viewVue.getViewDirty && viewVue.getViewDirty();
  }