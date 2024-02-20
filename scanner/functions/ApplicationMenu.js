function ApplicationMenu(options) {
  var menuJson = season.resolve(path.join(__dirname, '..', '..', 'menus', process.platform + '.json'));
  var template = season.readFileSync(menuJson);
  this.template = this.translateTemplate(template.menu, options.pkg);
}