async function signWindows(context) {
  const filePath = context.path;

  await azureSign(filePath);
}