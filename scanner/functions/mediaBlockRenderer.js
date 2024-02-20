function mediaBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    return { component: Media, editable: false };
  }

  return null;
}