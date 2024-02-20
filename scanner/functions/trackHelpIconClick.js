function trackHelpIconClick(eventAction) {
  gaSendEvent({
    eventCategory: 'Help Icon clicked',
    eventAction,
  });
}