async function createWebp({ fileBuffer, fileExt, lossless, config }) {
  const imageFormat = await getImageFormat(fileBuffer);

  switch (fileExt) {
    case '.gif':
      if (imageFormat !== 'gif') {
        return fileBuffer;
      }

      return execBuffer({
        bin: gif2webp,
        args: [
          ...optionsToArguments({
            options: (lossless ? config?.webpGif?.lossless : config?.webpGif?.lossy) || {},
            prefix: '-',
          }),
          execBuffer.input,
          '-o',
          execBuffer.output,
        ],
        input: fileBuffer,
      });

    default:
      if (!['jpeg', 'png'].includes(imageFormat)) {
        return fileBuffer;
      }

      return sharp(fileBuffer)
        .webp((lossless ? config?.webp?.lossless : config?.webp?.lossy) || {})
        .toBuffer();
  }
}