function afterDetachment () {
      assert.equal(parentEl.object3D.children.length, 0);
      assert.notOk(el2.parentEl);
      assert.notOk(el2.parentNode);
      assert.ok(el2.components.geometry);
      assert.isFalse(el2.hasLoaded);

      el2.addEventListener('loaded', afterSecondAttachment);
      parentEl.appendChild(el2);
    }