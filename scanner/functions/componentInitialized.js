function componentInitialized (evt) {
        if (evt.detail.name !== 'visible') { return; }
        el.addEventListener('componentchanged', componentChanged);
        el.setAttribute('visible', false);
      }