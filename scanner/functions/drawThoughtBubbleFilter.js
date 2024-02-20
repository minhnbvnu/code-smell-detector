function drawThoughtBubbleFilter(landmarks, ref) {
  if (landmarks) {
    if (frame % K_AR_FRAME_INTERVAL === 0) {
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

      const thoughtScale = cd / 500;

      ref.position = {
        x:
          landmarks[17][0] +
          userVideoGroup.position.x +
          userVideoSprite.position.x,
        y:
          landmarks[17][1] +
          userVideoGroup.position.y +
          userVideoSprite.position.y,
      };
      ref.scale.setTo(thoughtScale, thoughtScale);
      ref.rotation = cline.angle;
      ref.visible = true;
    }
  } else {
    ref.visible = false;
  }
}