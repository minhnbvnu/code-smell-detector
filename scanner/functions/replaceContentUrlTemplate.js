function replaceContentUrlTemplate(templateUrl, level, x, y, z) {
    const mapUrl = generateMapUrl({ level, x, y, z });
    return templateUrl.replace(/{level}|{x}|{y}|{z}/gi, (matched) => mapUrl[matched]);
  }