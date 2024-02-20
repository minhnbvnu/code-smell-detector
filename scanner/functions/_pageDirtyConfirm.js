function _pageDirtyConfirm(viewEl, cbOk, cbCancel) {
    const viewVue = viewEl.__vue__;
    viewVue.viewDirtyConfirm(cbOk, cbCancel);
  }