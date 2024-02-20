async function detectProjectName(codeDir) {

  const mgrPyContent = await fs.readFile(path.join(codeDir, 'manage.py'));
  const match = /'DJANGO_SETTINGS_MODULE',\s+'(.+)\.settings'/.exec(mgrPyContent);

  if (match) {
    const prjName = match[1];
    debug(`detect Django project name is '${prjName}'`);
    return prjName;
  } 
  throw new Error('Cannot detect project name from manage.py');
    

}