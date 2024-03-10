function expandConfig() {
  if (typeof cfg === 'string' || validPositionObject(cfg) === true) {
    cfg = {
      position: cfg
    };
  }

  // default for orientation is white
  if (cfg.orientation !== 'black') {
    cfg.orientation = 'white';
  }
  CURRENT_ORIENTATION = cfg.orientation;

  // default for showNotation is true
  if (cfg.showNotation !== false) {
    cfg.showNotation = true;
  }

  // default for draggable is false
  if (cfg.draggable !== true) {
    cfg.draggable = false;
  }

  // default for dropOffBoard is 'snapback'
  if (cfg.dropOffBoard !== 'trash') {
    cfg.dropOffBoard = 'snapback';
  }

  // default for sparePieces is false
  if (cfg.sparePieces !== true) {
    cfg.sparePieces = false;
  }

  // draggable must be true if sparePieces is enabled
  if (cfg.sparePieces === true) {
    cfg.draggable = true;
  }

  // default piece theme is wikipedia
  if (cfg.hasOwnProperty('pieceTheme') !== true ||
      (typeof cfg.pieceTheme !== 'string' &&
       typeof cfg.pieceTheme !== 'function')) {
    cfg.pieceTheme = 'img/chesspieces/wikipedia/{piece}.png';
  }

  // animation speeds
  if (cfg.hasOwnProperty('appearSpeed') !== true ||
      validAnimationSpeed(cfg.appearSpeed) !== true) {
    cfg.appearSpeed = 200;
  }
  if (cfg.hasOwnProperty('moveSpeed') !== true ||
      validAnimationSpeed(cfg.moveSpeed) !== true) {
    cfg.moveSpeed = 200;
  }
  if (cfg.hasOwnProperty('snapbackSpeed') !== true ||
      validAnimationSpeed(cfg.snapbackSpeed) !== true) {
    cfg.snapbackSpeed = 50;
  }
  if (cfg.hasOwnProperty('snapSpeed') !== true ||
      validAnimationSpeed(cfg.snapSpeed) !== true) {
    cfg.snapSpeed = 25;
  }
  if (cfg.hasOwnProperty('trashSpeed') !== true ||
      validAnimationSpeed(cfg.trashSpeed) !== true) {
    cfg.trashSpeed = 100;
  }

  // make sure position is valid
  if (cfg.hasOwnProperty('position') === true) {
    if (cfg.position === 'start') {
      CURRENT_POSITION = deepCopy(START_POSITION);
    }

    else if (validFen(cfg.position) === true) {
      CURRENT_POSITION = fenToObj(cfg.position);
    }

    else if (validPositionObject(cfg.position) === true) {
      CURRENT_POSITION = deepCopy(cfg.position);
    }

    else {
      error(7263, 'Invalid value passed to config.position.', cfg.position);
    }
  }

  return true;
}