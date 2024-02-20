function drawTophatFilter(landmarks) {
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

      const hatScale = cd / 300;
      const monocleScale = cd / 500;
      const mustacheScale = cd / 600;

      const median = cline.midPoint();
      let perpendicular = new Phaser.Line(median.x, median.y, 0, 0);
      perpendicular = perpendicular.fromAngle(
        median.x,
        median.y,
        cline.angle - 1.5708,
        cd * 0.2
      );

      tophat.position = perpendicular.end;
      tophat.scale.setTo(hatScale, hatScale);
      tophat.rotation = cline.angle;
      tophat.visible = true;

      // pupil as centroid of eye shape
      let rightPupil = [0, 0];
      for (let j = 0; j < K_FACE_RIGHT_EYE.length - 1; j += 1) {
        rightPupil[0] += landmarks[K_FACE_RIGHT_EYE[j]][0];
        rightPupil[1] += landmarks[K_FACE_RIGHT_EYE[j]][1];
      }

      rightPupil[0] /= K_FACE_RIGHT_EYE.length - 1;
      rightPupil[1] /= K_FACE_RIGHT_EYE.length - 1;

      monocle.position = {
        x:
          rightPupil[0] +
          userVideoGroup.position.x +
          userVideoSprite.position.x,
        y:
          rightPupil[1] +
          userVideoGroup.position.y +
          userVideoSprite.position.y,
      };
      monocle.scale.setTo(monocleScale, monocleScale);
      monocle.rotation = cline.angle;
      monocle.visible = true;

      mustache.position = {
        x:
          landmarks[33][0] +
          userVideoGroup.position.x +
          userVideoSprite.position.x,
        y:
          landmarks[33][1] +
          userVideoGroup.position.y +
          userVideoSprite.position.y,
      };
      mustache.scale.setTo(mustacheScale, mustacheScale);
      mustache.rotation = cline.angle;
      mustache.visible = true;
    }
  } else {
    tophat.visible = false;
    monocle.visible = false;
    mustache.visible = false;
  }
}