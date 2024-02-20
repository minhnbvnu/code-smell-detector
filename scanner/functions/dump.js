function dump(data, outputPath) {
  console.log(`\u001b[92mWriting to file\u001b[39m ${outputPath}`);
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
}