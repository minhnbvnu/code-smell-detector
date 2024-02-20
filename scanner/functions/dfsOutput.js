function dfsOutput(rules, root, lastColor, revertColor) {
  var color = kBlank;
  if (lastColor === undefined) {
    if (root.count[kRed] < root.count[kBlue])
      color = kRed;
    else
      color = kBlue;
  } else if (revertColor) {
    color = lastColor ^ 1;
  }
  if (color === kBlank) {
    color = lastColor;
  } else {
    rules.push({
      prefix: root.prefix.toIPv4(),
      mask: root.prefix.toMask(),
      length: root.prefix.length,
      gateway: color == kRed ? 'net' : 'vpn'
    });
  }
  var left = root.children[0];
  var right = root.children[1];
  if (left)
    dfsOutput(rules, left, color, (root.operation[color] & kPullLeft) === 0);
  if (right)
    dfsOutput(rules, right, color, (root.operation[color] & kPullRight) === 0);
}