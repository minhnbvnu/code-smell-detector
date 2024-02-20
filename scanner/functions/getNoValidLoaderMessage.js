function getNoValidLoaderMessage(data) {
    const { url, type } = getResourceUrlAndType(data);
    let message = "No valid loader found (";
    message += url ? `${path_exports.filename(url)}, ` : "no url provided, ";
    message += `MIME type: ${type ? `"${type}"` : "not provided"}, `;
    const firstCharacters = data ? getFirstCharacters2(data) : "";
    message += firstCharacters ? ` first bytes: "${firstCharacters}"` : "first bytes: not available";
    message += ")";
    return message;
  }