function append_namespace(string_of_events, ns) {
  return string_of_events
    .split(' ')
    .map(event_name => event_name + ns)
    .join(' ');
}