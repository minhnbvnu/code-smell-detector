function checkPuppeteerBinary() {
  try {
    // settings.json
    var executablePath = vscode.workspace.getConfiguration('markdown-pdf')['executablePath'] || ''
    if (isExistsPath(executablePath)) {
      INSTALL_CHECK = true;
      return true;
    }

    // bundled Chromium
    const puppeteer = require('puppeteer-core');
    executablePath = puppeteer.executablePath();
    if (isExistsPath(executablePath)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    showErrorMessage('checkPuppeteerBinary()', error);
  }
}