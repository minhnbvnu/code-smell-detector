async function doImageRegisterEventTag(el) {
  const visitor = await getVisitor();
  visitor.event({
    ec: 'imageRegistry',
    ea: 'resolve',
    el
  }).send();
}