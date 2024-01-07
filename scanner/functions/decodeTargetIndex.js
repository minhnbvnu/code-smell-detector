function decodeTargetIndex(firstCh, index, target, count) {
  if (firstCh === '-' || firstCh === '+') {
    target = index + target;
  }

  if (target === index || target < 0 || target >= count) {
    return false;
  }

  return target;
}