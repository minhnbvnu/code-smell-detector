async function reloadServiceRes(tplPath, name) {

  const tpl = await getTpl(tplPath);

  for (let { serviceName, serviceRes } of definition.findServices(tpl.Resources)) {
    if (name === serviceName) {
      return serviceRes;
    }
  }
  return {};
}