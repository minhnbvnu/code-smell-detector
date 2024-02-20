function drawDogFilter(landmarks) {
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
      const noseScale = cd / 1050;
      dogNose.scale.setTo(noseScale, noseScale);
      dogNose.position.x =
        landmarks[30][0] +
        userVideoGroup.position.x +
        userVideoSprite.position.x;
      dogNose.position.y =
        landmarks[30][1] +
        userVideoGroup.position.y +
        userVideoSprite.position.y;
      dogNose.rotation = cline.angle;
      dogNose.visible = true;

      const median = cline.midPoint();
      let perpendicular = new Phaser.Line(median.x, median.y, 0, 0);
      perpendicular = perpendicular.fromAngle(
        median.x,
        median.y,
        cline.angle - 1.5708,
        cd * 0.4
      );

      const dogEarsScale = cd / 320;
      dogEars.scale.setTo(dogEarsScale, dogEarsScale);

      dogEars.position = perpendicular.end;
      dogEars.rotation = cline.angle;
      dogEars.visible = true;

      const s =
        new Phaser.Line(
          landmarks[0][0],
          landmarks[0][1],
          landmarks[16][0],
          landmarks[16][1]
        ).length / 100;
      headPhysicsSprite.scale.setTo(s, s);
      headPhysicsSprite.position = {
        x:
          landmarks[33][0] +
          userVideoGroup.position.x +
          userVideoSprite.position.x,
        y:
          landmarks[33][1] +
          userVideoGroup.position.y +
          userVideoSprite.position.y,
      };
      headPhysicsSprite.visible = true;

      game.physics.arcade.collide(dogEmojiEmitter, headPhysicsSprite);
    }
  } else {
    dogNose.visible = false;
    dogEars.visible = false;
    headPhysicsSprite.visible = false;
  }
}