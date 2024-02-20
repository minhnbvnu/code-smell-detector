function updateControllers() {

    for (var i = 0; i < controllers.length; i++) {

      var controller = controllers[i];

      var gamepad = findGamepad(i);

      if (gamepad !== undefined && gamepad.pose !== undefined) {

        if (gamepad.pose === null) return;

        //  Pose

        var pose = gamepad.pose;

        if (pose.hasPosition === false) controller.position.set(0.2, -0.6, -0.05);

        if (pose.position !== null) controller.position.fromArray(pose.position);
        if (pose.orientation !== null) controller.quaternion.fromArray(pose.orientation);
        controller.matrix.compose(controller.position, controller.quaternion, controller.scale);
        controller.matrix.premultiply(standingMatrix);
        controller.matrix.decompose(controller.position, controller.quaternion, controller.scale);
        controller.matrixWorldNeedsUpdate = true;
        controller.visible = true;

        //  Trigger

        var buttonId = gamepad.id === 'Daydream Controller' ? 0 : 1;

        if (triggers[i] !== gamepad.buttons[buttonId].pressed) {

          triggers[i] = gamepad.buttons[buttonId].pressed;

          if (triggers[i] === true) {

            controller.dispatchEvent({ type: 'selectstart' });

          } else {

            controller.dispatchEvent({ type: 'selectend' });
            controller.dispatchEvent({ type: 'select' });

          }

        }

      } else {

        controller.visible = false;

      }

    }

  }