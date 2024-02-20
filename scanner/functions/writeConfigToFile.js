function writeConfigToFile(path, data) {
    const extension = getFileExtension(getFileNameFromPath(path));
    const dataType = {
        yml: content => YAML.stringify(content),
        yaml: content => YAML.stringify(content),
        json: content => beautify(JSON.stringify(content)),
        none: content => beautify(JSON.stringify(content)),
        js: content => beautify(`module.exports = ${JSON.stringify(content)}`)
    };

    return dataType[extension || 'none'](data);
}