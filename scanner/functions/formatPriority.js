function formatPriority(priority) {
  switch (priority) {
    case 1:
      return 'synchronous';
    case 2:
      return 'task';
    case 3:
      return 'hi-pri work';
    case 4:
      return 'lo-pri work';
    case 5:
      return 'offscreen work';
    default:
      throw new Error('Unknown priority.');
  }
}