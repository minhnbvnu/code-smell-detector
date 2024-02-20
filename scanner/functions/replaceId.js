function replaceId(str, id) {
    var fixedId = id.replace(hexRxp, replaceHexCode);
    var uniqId = uniqify(fixedId);
    return 'id="' + prefix + uniqId + '" data-name="' + fixedId + '"';
  }