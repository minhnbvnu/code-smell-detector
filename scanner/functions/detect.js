function detect (hand) {
        component.data.hand = hand;
        el.sceneEl.systems['tracked-controls-webvr'].controllers = createMotionControllersList('', '');

        // delete our previously created mock, so component behaves as if it's never
        // checked for controller presence previously.
        delete component.controllerPresent;

        component.checkIfControllerPresent();

        assert.notOk(component.controllerPresent, hand + ' controllers present');
      }