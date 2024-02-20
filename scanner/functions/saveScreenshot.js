async function saveScreenshot(page, screenshotName) {
    if (process.env.SCREENSHOT_FOLDER && screenshotName) {
        const sanitized = screenshotName.replace(/[^\w_]/g, '_');
        const file = `${process.env.SCREENSHOT_FOLDER}/${sanitized}.png`;
        await page.screenshot({ path: file });
        // eslint-disable-next-line
        console.log('Wrote ', file);
    }
}