function handleHit (hitEl) {
        hitEl.emit('hit');
        hitEl.addState(self.data.state);
        self.el.emit('hit', {el: hitEl});
      }