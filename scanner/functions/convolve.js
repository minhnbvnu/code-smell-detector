function convolve(context, kernel) {
  const canvas = context.canvas;
  const width = canvas.width;
  const height = canvas.height;

  const size = Math.sqrt(kernel.length);
  const half = Math.floor(size / 2);

  const inputData = context.getImageData(0, 0, width, height).data;

  const output = context.createImageData(width, height);
  const outputData = output.data;

  for (let pixelY = 0; pixelY < height; ++pixelY) {
    const pixelsAbove = pixelY * width;
    for (let pixelX = 0; pixelX < width; ++pixelX) {
      let r = 0,
        g = 0,
        b = 0,
        a = 0;
      for (let kernelY = 0; kernelY < size; ++kernelY) {
        for (let kernelX = 0; kernelX < size; ++kernelX) {
          const weight = kernel[kernelY * size + kernelX];
          const neighborY = Math.min(
            height - 1,
            Math.max(0, pixelY + kernelY - half),
          );
          const neighborX = Math.min(
            width - 1,
            Math.max(0, pixelX + kernelX - half),
          );
          const inputIndex = (neighborY * width + neighborX) * 4;
          r += inputData[inputIndex] * weight;
          g += inputData[inputIndex + 1] * weight;
          b += inputData[inputIndex + 2] * weight;
          a += inputData[inputIndex + 3] * weight;
        }
      }
      const outputIndex = (pixelsAbove + pixelX) * 4;
      outputData[outputIndex] = r;
      outputData[outputIndex + 1] = g;
      outputData[outputIndex + 2] = b;
      outputData[outputIndex + 3] = kernel.normalized ? a : 255;
    }
  }
  context.putImageData(output, 0, 0);
}