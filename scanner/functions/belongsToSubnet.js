function belongsToSubnet(ip, list) {
  ip = ip >>> 0;

  if (list.length === 0 || ip < list[0][0])
    return false;

  // Binary search
  var x = 0, y = list.length, middle;
  while (y - x > 1) {
    middle = Math.floor((x + y) / 2);
    if (list[middle][0] <= ip)
      x = middle;
    else
      y = middle;
  }

  // Match
  var masked = ip & list[x][1];
  return (masked ^ list[x][0]) === 0;
}