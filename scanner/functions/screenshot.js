async function screenshot({app, page}, name) {
    if (settings.SCREENS) {
        await mkdirp(settings.SCREENS_DIR)
        const filename = `${page._name}-${name}.png`
        const screenshotPath = path.join(settings.SCREENS_DIR, filename)
        await app.screenshot({path: screenshotPath})
    }
}