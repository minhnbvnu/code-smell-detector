function addFile (builder, key, fileSrc) {
  builder.appendLine('content.Add(new StreamContent(File.OpenRead' +
    `("${sanitize(fileSrc)}")), "${sanitize(key)}", "${sanitize(fileSrc)}");`);
}