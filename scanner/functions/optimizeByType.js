async function optimizeByType({ fileBuffer, filePath, isLossless, config }) {
  const fileExt = path.extname(filePath).toLowerCase();
  const imageFormat = await getImageFormat(fileBuffer);

  switch (fileExt) {
    case '.jpg':
    case '.jpeg':
      if (imageFormat !== 'jpeg') {
        return fileBuffer;
      }

      return isLossless
        ? execBuffer({
          bin: guetzli,
          args: [
            ...optionsToArguments({
              options: config?.jpeg?.lossless || {},
            }),
            execBuffer.input,
            execBuffer.output,
          ],
          input: await setSrgbColorspace(fileBuffer),
        })
        : sharp(fileBuffer)
          .jpeg(config?.jpeg?.lossy || {})
          .toBuffer();

    case '.png':
      if (imageFormat !== 'png') {
        return fileBuffer;
      }

      return sharp(fileBuffer)
        .png((isLossless ? config?.png?.lossless : config?.png?.lossy) || {})
        .toBuffer();

    case '.gif':
      if (imageFormat !== 'gif') {
        return fileBuffer;
      }

      return execBuffer({
        bin: gifsicle,
        args: [
          ...optionsToArguments({
            options: (isLossless ? config?.gif?.lossless : config?.gif?.lossy) || {},
            concat: true,
          }),
          `--threads=${os.cpus().length}`,
          '--no-warnings',
          '--output',
          execBuffer.output,
          execBuffer.input,
        ],
        input: fileBuffer,
      });

    case '.svg':
      if (imageFormat !== 'svg') {
        return fileBuffer;
      }

      return Buffer.from(svgo.optimize(fileBuffer, {
        ...config?.svg || {},
      }).data);

    default:
      throw new Error(`Unsupported file type: "${fileExt}"`);
  }
}