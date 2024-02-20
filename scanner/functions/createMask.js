async function createMask (inputFilePath, mask = []) {
  let sharp, Jimp
  try {
    sharp = (await import('sharp')).default
  } catch (e) {
    logger.error('sharp未安装，请执行 pnpm install sharp@0.31.3')
    throw new Error('sharp未安装，请执行 pnpm install sharp@0.31.3')
  }
  try {
    Jimp = (await import('jimp')).default
  } catch (e) {
    logger.error('jimp未安装，请执行 pnpm install jimp')
    throw new Error('jimp未安装，请执行 pnpm install jimp')
  }
  let image = await sharp(inputFilePath)
    .png()
    .ensureAlpha()
    .toBuffer()
    .then(inputData => {
      // Load the PNG input data with Jimp
      return Jimp.read(inputData)
    })
  let [x, y, width, height] = mask
  // Set the transparency for a specified rectangular area
  image.scan(x, y, width, height, function (x, y, idx) {
    this.bitmap.data[idx + 3] = 0 // set alpha to 0 to make transparent
  })

  // Write the modified PNG data to a new file
  const outputFilePath = `data/chatgpt/imagesAccept/${Date.now()}_masked.png`
  await image.writeAsync(outputFilePath)
  return outputFilePath
}