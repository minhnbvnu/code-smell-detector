function indexToValueInSpace(index, space) {
  if (typeof space === 'number') {
    return space;
  }

  const count = space.count || space.max - space.min;
  index %= count;
  return space.min + Math.floor(index / (count - 1) * (space.max - space.min));
}