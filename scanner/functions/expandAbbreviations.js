function expandAbbreviations(template, abbreviations) {
  debug('abbreviations is %s', JSON.stringify(abbreviations));

  if (template in abbreviations) {
    return renderContent(abbreviations[template], {
      vars: { templatePath: path.resolve(__dirname, '../../templates') }
    });
  }

  let arr = template.split(':');
  if (arr.length === 2) {
    const [prefix, rest] = arr;
    if (prefix in abbreviations) {
      return renderContent(abbreviations[prefix], { vars: { template: rest } });
    }
  }
  /*
   * username/repo-name, username can only contain alphanumeric characters and hyphen, and cannot begin and end with hyphen;
   * repo-name cannot be "." and ".." and can only contain dot, alphanumeric characters, underline and hyphen
   */
  if (/^([\w\d]+(-+[\d\w])|[\w\d]+)\/((\.[\w\d-_]+)|(\.\.[\w\d-_.]+)|[\w\d-_][\w\d-_.]*)$/.test(template)) {
    arr = template.split('/');
    return renderContent(abbreviations['gh'], { vars: { template } });
  }
  
  return template;
}