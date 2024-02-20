function getChromaticAberrationOffsets(canvas, offset) {
  if (lastOffsets.width !== canvas.width || lastOffsets.height !== canvas.height || lastOffsets.offset !== offset) {
    lastOffsets.width = canvas.width;
    lastOffsets.height = canvas.height;
    lastOffsets.offset = offset;
    lastOffsets.tPtr1 = new Int32Array(canvas.width * canvas.height);
    lastOffsets.tPtr2 = new Int32Array(canvas.width * canvas.height);

    let tPtrIndex = 0;
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const dx = .5 * canvas.width - x;
        const dy = .5 * canvas.height - y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const dir = { x: dx / d, y: dy / d };
        const tx1 = .5 * canvas.width + offset * d * dir.x;
        const ty1 = .5 * canvas.height + offset * d * dir.y;
        const tPtr1 = (Math.round(ty1) * canvas.width + Math.round(tx1)) * 4;
        const tx2 = .5 * canvas.width - offset * d * dir.x;
        const ty2 = .5 * canvas.height - offset * d * dir.y;
        const tPtr2 = (Math.round(ty2) * canvas.width + Math.round(tx2)) * 4;
        lastOffsets.tPtr1[tPtrIndex] = tPtr1;
        lastOffsets.tPtr2[tPtrIndex] = tPtr2;
        tPtrIndex++;
      }
    }
  }

  return lastOffsets;
}