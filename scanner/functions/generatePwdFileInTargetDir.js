async function generatePwdFileInTargetDir(tragetDir, uid, gid) {
  if (!uid) { uid = process.getuid(); }
  if (!gid) { gid = process.getgid(); }
  let filePath = path.join('/', 'tmp', `fun_${uid}_${gid}_passwd`);
  if (tragetDir) {
    filePath = path.join(tragetDir, `.fun_${uid}_${gid}_passwd`);
  }

  if (!await fs.pathExists(filePath)) {
    const content = passwdContent + `funcrafter:x:${uid}:${gid}::/tmp:/usr/sbin/nologin`;
    await fs.writeFile(filePath, content);
  }

  return filePath;
}