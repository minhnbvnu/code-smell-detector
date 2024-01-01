function componentChanged (evt) {
        if (evt.detail.name !== 'visible') { return; }
        // Should not reach here.
        assert.equal(true, false, 'Component should not have emitted changed.');
      }