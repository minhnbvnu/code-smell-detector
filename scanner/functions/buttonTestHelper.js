function buttonTestHelper (done, buttonIndex, buttonName) {
      var state = {value: 0.5, pressed: true, touched: true};
      el.sceneEl.systems['tracked-controls-webvr'].controllers = createMotionControllersList(MOCKS.HAND_RIGHT);
      // Do the check.
      component.checkIfControllerPresent();
      // Install event handler listening for changed event.
      el.addEventListener(buttonName + 'changed', function (evt) {
        assert.ok(evt.detail, 'event.detail not null');
        assert.strictEqual(evt.detail.value, state.value, 'event detail.value');
        assert.strictEqual(evt.detail.pressed, state.pressed, 'event detail.pressed');
        assert.strictEqual(evt.detail.touched, state.touched, 'event detail.touched');
        done();
      });
      // Emit buttonchanged.
      el.emit('buttonchanged', {id: buttonIndex, state: state});
    }