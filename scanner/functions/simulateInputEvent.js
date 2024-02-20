function simulateInputEvent($node) {
    var $e, type;

    type = _.isMsie() ? 'keypress' : 'input';
    $e = $.Event(type);

    $node.trigger($e);
  }