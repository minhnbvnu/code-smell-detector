async function getTplInfo(tpl, tplPath) {
  let projectTpl;
  let projectTplPath;

  if (usingProjectTemplate(tplPath)) {

    projectTpl = tpl;
    projectTplPath = tplPath;
  } else {
    const obj = await getProjectTpl(tplPath);
    projectTpl = obj.projectTpl;
    projectTplPath = obj.projectTplPath;
  }

  return {
    projectTpl,
    projectTplPath
  };
}