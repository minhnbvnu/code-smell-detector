function binsearchInsert(list, seekVal, cmpfunc) {
  if (!list.length)
    return 0;

  let low = 0, high = list.length - 1,
      mid, cmpval;

  while (low <= high) {
    mid = low + Math.floor((high - low) / 2);
    cmpval = cmpfunc(seekVal, list[mid]);

    if (cmpval < 0)
      high = mid - 1;
    else if (cmpval > 0)
      low = mid + 1;
    else
      break;
  }

  if (cmpval < 0)
    return mid; // insertion is displacing, so use mid outright.
  else if (cmpval > 0)
    return mid + 1;
  else
    return mid;
}