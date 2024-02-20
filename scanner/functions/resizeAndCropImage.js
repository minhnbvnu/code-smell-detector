async function resizeAndCropImage (inputFilePath, outputFilePath, size = 512) {
  // Determine the maximum dimension of the input image
  let sharp
  try {
    sharp = (await import('sharp')).default
  } catch (e) {
    logger.error('sharp未安装，请执行 pnpm install sharp@0.31.3')
    throw new Error('sharp未安装，请执行 pnpm install sharp@0.31.3')
  }
  const metadata = await sharp(inputFilePath).metadata()
  const maxDimension = Math.max(metadata.width, metadata.height)
  logger.mark(`original picture size is ${metadata.width} x ${metadata.height}`)
  // Calculate the required dimensions for the output image
  const outputWidth = Math.round(size * metadata.width / maxDimension)
  const outputHeight = Math.round(size * metadata.height / maxDimension)

  // Resize the image to the required dimensions
  await sharp(inputFilePath)
    .resize(outputWidth, outputHeight, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .resize(size, size, { fit: 'cover', position: 'center' })
    .png()
    .toFile(outputFilePath)
  console.log('Image resized successfully!')

  console.log('Image resized and cropped successfully!')
}