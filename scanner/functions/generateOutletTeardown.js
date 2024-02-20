function generateOutletTeardown(parentView, outlet) {
  return function() { parentView.disconnectOutlet(outlet); };
}