function doChromaticAberration(canvas, offset) {
  const context = canvas.getContext('2d');
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const targetImageData = context.createImageData(canvas.width, canvas.height);
  const offsets = getChromaticAberrationOffsets(canvas, offset);
  let ptr = 0;
  let tPtrIndex = 0;
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const tPtr1 = offsets.tPtr1[tPtrIndex];
      const tPtr2 = offsets.tPtr2[tPtrIndex];
      targetImageData.data[ptr] = imageData.data[tPtr1];
      targetImageData.data[ptr + 1] = imageData.data[ptr + 1];
      targetImageData.data[ptr + 2] = imageData.data[tPtr2 + 2];
      targetImageData.data[ptr + 3] = imageData.data[ptr + 3];
      tPtrIndex++;
      ptr += 4;
    }
  }
  context.putImageData(targetImageData, 0, 0);
}