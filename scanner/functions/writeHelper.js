async function writeHelper(helper) {
  const filePath = path.join(helpersDir, `${toSlug(helper.name)}.json`);
  const data = JSON.stringify(helper, null, 2) + '\n';
  await writeFile(filePath, data);
  return filePath;
}