function getChannelName(channel) {
  return channel === 'stable' ? 'atom' : `atom-${channel}`;
}