function simulateKeyEvent($node, type, key, withModifier) {
    var $e;

    $e = $.Event(type, {
      keyCode: key,
      altKey: !!withModifier,
      ctrlKey: !!withModifier,
      metaKey: !!withModifier,
      shiftKey: !!withModifier
    });

    spyOn($e, 'preventDefault');
    $node.trigger($e);

    return $e;
  }