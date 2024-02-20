function gaSendEvent({ eventCategory, eventAction, eventLabel }) {
  if (!window.gtag) {
    console.log(
      'Ga debug: ',
      'send',
      'event',
      eventCategory,
      eventAction,
      eventLabel
    );
    return;
  }
  window.gtag('event', eventAction, {
    event_category: eventCategory,
    event_label: eventLabel,
  });
}