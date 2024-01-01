function afterSecondAttachment () {
      el2.removeEventListener('loaded', afterSecondAttachment);

      assert.equal(parentEl.object3D.children[0].uuid, el2.object3D.uuid);
      assert.ok(el2.parentEl);
      assert.ok(el2.parentNode);
      assert.ok(el2.components.geometry);
      assert.isTrue(el2.hasLoaded);

      done();
    }