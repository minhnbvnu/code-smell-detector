function reflectEvent(sEmitter, sType, tEmitter, tType) {
  sEmitter.addListener(sType, function() {
    tEmitter.emit.apply(
        tEmitter,
        [tType || sType].concat(Array.prototype.slice.call(arguments))
    );
  });
}