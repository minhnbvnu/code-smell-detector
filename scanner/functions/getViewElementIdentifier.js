function getViewElementIdentifier(locals, view) {
    if (viewState(locals)['abstract']) return viewState(locals).name;
    if (view) return view.stateId || view.viewId;
    return ionic.Utils.nextUid();
  }