function getSchedulingEventLabel(event) {
  switch (event.type) {
    case 'schedule-render':
      return 'render scheduled';

    case 'schedule-state-update':
      return 'state update scheduled';

    case 'schedule-force-update':
      return 'force update scheduled';

    default:
      return null;
  }
}