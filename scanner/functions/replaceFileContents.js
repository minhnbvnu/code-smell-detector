function replaceFileContents(fileContent, fileDir, locale) {
    const pattern = /%%([^%]+)%%|__(.+?)__/g;

    return fileContent.replace(pattern, (_, filename, translationKey) => {
        if (filename != undefined) {
            const filenamePath = path.join(fileDir, filename);
            try {
                const data = fs.readFileSync(filenamePath, "utf8");
                const replacedData = replaceFileContents(data, path.dirname(filenamePath), locale);
                return replacedData;
            } catch (error) {
                console.error(`Error reading file "${filenamePath}":`, error);
                return "";
            }
        } else if (translationKey != undefined) {
            return i18n.translateWithLocale(locale, translationKey);
        }
    });
}