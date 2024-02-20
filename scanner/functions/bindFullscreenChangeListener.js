function bindFullscreenChangeListener(
  data, fullscreenchangeListener
) {
  const event = 'fullscreenchange ';
  const vendor_prefixes = [
    'webkit',
    'moz',
    'ms'
  ];
  const all_events = (event + vendor_prefixes.join(event) + event).trim();
  $(document).on(all_events, data, fullscreenchangeListener);
}