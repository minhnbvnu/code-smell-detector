function trackHelpClick(eventAction) {
  gaSendEvent({
    eventCategory: 'Help clicked',
    eventAction,
  });
}