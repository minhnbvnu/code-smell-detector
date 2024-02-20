function calculateAnimations(pos1, pos2) {
  // make copies of both
  pos1 = deepCopy(pos1);
  pos2 = deepCopy(pos2);

  var animations = [];
  var squaresMovedTo = {};

  // remove pieces that are the same in both positions
  for (var i in pos2) {
    if (pos2.hasOwnProperty(i) !== true) continue;

    if (pos1.hasOwnProperty(i) === true && pos1[i] === pos2[i]) {
      delete pos1[i];
      delete pos2[i];
    }
  }

  // find all the "move" animations
  for (var i in pos2) {
    if (pos2.hasOwnProperty(i) !== true) continue;

    var closestPiece = findClosestPiece(pos1, pos2[i], i);
    if (closestPiece !== false) {
      animations.push({
        type: 'move',
        source: closestPiece,
        destination: i,
        piece: pos2[i]
      });

      delete pos1[closestPiece];
      delete pos2[i];
      squaresMovedTo[i] = true;
    }
  }

  // add pieces to pos2
  for (var i in pos2) {
    if (pos2.hasOwnProperty(i) !== true) continue;

    animations.push({
      type: 'add',
      square: i,
      piece: pos2[i]
    })

    delete pos2[i];
  }

  // clear pieces from pos1
  for (var i in pos1) {
    if (pos1.hasOwnProperty(i) !== true) continue;

    // do not clear a piece if it is on a square that is the result
    // of a "move", ie: a piece capture
    if (squaresMovedTo.hasOwnProperty(i) === true) continue;

    animations.push({
      type: 'clear',
      square: i,
      piece: pos1[i]
    });

    delete pos1[i];
  }

  return animations;
}