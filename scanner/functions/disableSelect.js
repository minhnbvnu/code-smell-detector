function disableSelect(jObject) {
  // $$$ check here for right-click and don't disable.  Also use jQuery style
  //     for stopping propagation. See https://bugs.edge.launchpad.net/gnubook/+bug/362626
  jObject.bind('mousedown', () => false);
  // Special hack for IE7
  jObject[0].onselectstart = () => false;
}