function processDirectory (inputDir, outputDir) {
  glob(`${inputDir}*.json`, async function (err, files) {
    if (err) {
      console.error(err)
      return
    }
    // Create output directory if it doesn't exist
    fs.mkdirSync(outputDir, { recursive: true })
    // Loop files in directory and process
    for (const file of files) {
      console.log(`Processing file ${file}`)
      // Process and write result to output directory for troubleshooting
      const output = processFile(file)
      const basename = path.basename(file)
      const outputPath = `${outputDir}${basename}`
      fs.writeFileSync(outputPath, JSON.stringify(output))
      // Submit for verification if it has been deployed
      if (output.address) {
        // Retrieve the constructor args from on chain
        const constructorArgs = await getConstructorArgs(output.transactionHash, output.bytecode)
        // Submit verification
        await submitVerification(output.data, output.name, output.address, output.compiler.version, constructorArgs)
      }
    }
  })
}