function drawSunglasses() {
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

  const pline = new Phaser.Line(
    leftPupil[0] + userVideoSprite.position.x,
    leftPupil[1] + userVideoSprite.position.y,
    rightPupil[0] + userVideoSprite.position.x,
    rightPupil[1] + userVideoSprite.position.y
  );
  const pd = pline.length;
  const glassesScale = pd / 200;
  sunglasses.scale.setTo(glassesScale, glassesScale);
  sunglasses.position = pline.midPoint();
  sunglasses.rotation = pline.angle;
  sunglasses.visible = true;
}