function drawProhibitedFilter(landmarks) {
  if (landmarks) {
    if (frame % K_AR_FRAME_INTERVAL === 0) {
      // Pupils as centroids of eye shapes
      let leftPupil = [0, 0];
      for (let j = 0; j < K_FACE_LEFT_EYE.length - 1; j += 1) {
        leftPupil[0] += landmarks[K_FACE_LEFT_EYE[j]][0];
        leftPupil[1] += landmarks[K_FACE_LEFT_EYE[j]][1];
      }

      leftPupil[0] /= K_FACE_LEFT_EYE.length - 1;
      leftPupil[1] /= K_FACE_LEFT_EYE.length - 1;

      let rightPupil = [0, 0];
      for (let j = 0; j < K_FACE_RIGHT_EYE.length - 1; j += 1) {
        rightPupil[0] += landmarks[K_FACE_RIGHT_EYE[j]][0];
        rightPupil[1] += landmarks[K_FACE_RIGHT_EYE[j]][1];
      }

      rightPupil[0] /= K_FACE_RIGHT_EYE.length - 1;
      rightPupil[1] /= K_FACE_RIGHT_EYE.length - 1;

      const cline = new Phaser.Line(
        landmarks[0][0] +
          userVideoGroup.position.x +
          userVideoSprite.position.x,
        landmarks[0][1] +
          userVideoGroup.position.y +
          userVideoSprite.position.y,
        landmarks[16][0] +
          userVideoGroup.position.x +
          userVideoSprite.position.x,
        landmarks[16][1] +
          userVideoGroup.position.y +
          userVideoSprite.position.y
      );
      const cd = cline.length;

      const pScale = cd / 650;

      leftProhibited.position = {
        x:
          leftPupil[0] + userVideoGroup.position.x + userVideoSprite.position.x,
        y:
          leftPupil[1] + userVideoGroup.position.y + userVideoSprite.position.y,
      };
      leftProhibited.scale.setTo(pScale, pScale);
      leftProhibited.rotation = cline.angle;
      leftProhibited.visible = true;

      rightProhibited.position = {
        x:
          rightPupil[0] +
          userVideoGroup.position.x +
          userVideoSprite.position.x,
        y:
          rightPupil[1] +
          userVideoGroup.position.y +
          userVideoSprite.position.y,
      };
      rightProhibited.scale.setTo(pScale, pScale);
      rightProhibited.rotation = cline.angle;
      rightProhibited.visible = true;
    }
  } else {
    leftProhibited.visible = false;
    rightProhibited.visible = false;
  }
}