function findMetaTag(attribute, regExp = /.*/) {
  let metas = document.querySelectorAll(`meta[${attribute}]`);
  for (let i = 0; i < metas.length; i++) {
    let match = metas[i].getAttribute(attribute).match(regExp);
    if (match) {
      return metas[i];
    }
  }
  return null;
}