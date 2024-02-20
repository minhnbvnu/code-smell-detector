function compileTemplate(templateName) {
    templateName = path.basename(templateName, '.mustache');
    const templatePath = path.resolve(templateDir, templateName + '.mustache');
    return Handlebars.compile(fse.readFileSync(templatePath, {
        encoding: 'utf-8'
    }));
}