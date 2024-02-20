function drawPoorHatFilter(landmarks) {
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

      const hatScale = cd / 350;

      const median = cline.midPoint();
      let perpendicular = new Phaser.Line(median.x, median.y, 0, 0);
      perpendicular = perpendicular.fromAngle(
        median.x,
        median.y,
        cline.angle - 1.5708,
        cd * 0.1
      );

      poorHat.position = perpendicular.end;
      poorHat.scale.setTo(hatScale, hatScale);
      poorHat.rotation = cline.angle;
      poorHat.visible = true;
    }
  } else {
    poorHat.visible = false;
  }
}