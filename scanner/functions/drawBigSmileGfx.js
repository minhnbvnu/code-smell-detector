function drawBigSmileGfx(l) {
        // All of this deep copy boilerplate is only happening
        // because we aren't applying scale and translation in one step
        // TODO: Make it better

        // Make a local copy of the argument
        const landmarks = [];
        for (let i = 0; i < l.length; i += 1) {
          landmarks.push([l[i][0], l[i][1]]);
        }

        // Scale the model by a factor of 4
        for (let i = 0; i < landmarks.length; i += 1) {
          landmarks[i][0] *= 4;
          landmarks[i][1] *= 4;
        }

        // Translate the model such that the approximate center of the
        // mouth is aligned with the center of the screen
        // NOTE: the hardcoded landmark 51 is not implementation independent!
        const xo = K_PROJECT_WIDTH / 2 - landmarks[51][0];
        const yo = K_PROJECT_HEIGHT / 2 - landmarks[51][1];

        for (let i = 0; i < landmarks.length; i += 1) {
          landmarks[i][0] += xo;
          landmarks[i][1] += yo;
        }

        petitionSmileGfx.visible = true;
        petitionSmileGfx.clear();
        petitionSmileGfx.lineStyle(6, 0xff0000, 1);

        petitionSmileGfx.moveTo(
          landmarks[K_FACE_MOUTH_OUTER[0]][0],
          landmarks[K_FACE_MOUTH_OUTER[0]][1]
        );

        for (let i = 1; i < K_FACE_MOUTH_OUTER.length; i += 1) {
          petitionSmileGfx.lineTo(
            landmarks[K_FACE_MOUTH_OUTER[i]][0],
            landmarks[K_FACE_MOUTH_OUTER[i]][1]
          );
        }

        petitionSmileGfx.moveTo(
          landmarks[K_FACE_MOUTH_INNER_TOP[0]][0],
          landmarks[K_FACE_MOUTH_INNER_TOP[0]][1]
        );

        for (let i = 1; i < K_FACE_MOUTH_INNER_TOP.length; i += 1) {
          petitionSmileGfx.lineTo(
            landmarks[K_FACE_MOUTH_INNER_TOP[i]][0],
            landmarks[K_FACE_MOUTH_INNER_TOP[i]][1]
          );
        }

        petitionSmileGfx.moveTo(
          landmarks[K_FACE_MOUTH_INNER_BOTTOM[0]][0],
          landmarks[K_FACE_MOUTH_INNER_BOTTOM[0]][1]
        );

        for (let i = 1; i < K_FACE_MOUTH_INNER_BOTTOM.length; i += 1) {
          petitionSmileGfx.lineTo(
            landmarks[K_FACE_MOUTH_INNER_BOTTOM[i]][0],
            landmarks[K_FACE_MOUTH_INNER_BOTTOM[i]][1]
          );
        }

        redirectingText.position = {
          x: landmarks[K_FACE_MOUTH_OUTER[6]][0] + 100,
          y: landmarks[K_FACE_MOUTH_OUTER[6]][1],
        };
      }