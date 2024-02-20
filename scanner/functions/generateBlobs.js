function generateBlobs(p, blobsArray, colors, positionX = null, positionY = null) {
  const offset = p.random(0.2, 0.6);

  if (positionX && positionY) {
    const scale = p.random(20, 40);

    const tSpeed = p.random(0.02, 0.05);
    const color = p.random(colors);

    const blob = new Blob(70, offset, scale, positionX, positionY, tSpeed, color);
    blobsArray.push(blob);
  } else {
    new Array(4).fill(1).map((_, i) => {
      const scale = p.random(20, 60);

      const x = i % 2 ? p.width / 4 + p.random(-200, 0) : (p.width / 4) * 3 + p.random(0, 200);
      const y = i < 2 ? p.height / 4 + p.random(-200, 0) : (p.height / 4) * 3 + p.random(0, 200);

      const tSpeed = p.random(0.02, 0.06);
      const color = colors[i % 4];

      const blob = new Blob(250, offset, scale, x, y, tSpeed, color);
      blobsArray.push(blob);
    });
  }
}