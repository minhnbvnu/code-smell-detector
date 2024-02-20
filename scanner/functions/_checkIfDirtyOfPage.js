function _checkIfDirtyOfPage(pageEl) {
    if (!pageEl) return false;
    const pageVue = pageEl.__vue__;
    return pageVue && pageVue.getPageDirty && pageVue.getPageDirty();
  }