function exportPdf(data, filename, type, uri) {

  if (!INSTALL_CHECK) {
    return;
  }
  if (!checkPuppeteerBinary()) {
    showErrorMessage('Chromium or Chrome does not exist! \
      See https://github.com/yzane/vscode-markdown-pdf#install');
    return;
  }

  var StatusbarMessageTimeout = vscode.workspace.getConfiguration('markdown-pdf')['StatusbarMessageTimeout'];
  vscode.window.setStatusBarMessage('');
  var exportFilename = getOutputDir(filename, uri);

  return vscode.window.withProgress({
    location: vscode.ProgressLocation.Notification,
    title: '[Markdown PDF]: Exporting (' + type + ') ...'
    }, async () => {
      try {
        // export html
        if (type == 'html') {
          exportHtml(data, exportFilename);
          vscode.window.setStatusBarMessage('$(markdown) ' + exportFilename, StatusbarMessageTimeout);
          return;
        }

        const puppeteer = require('puppeteer-core');
        // create temporary file
        var f = path.parse(filename);
        var tmpfilename = path.join(f.dir, f.name + '_tmp.html');
        exportHtml(data, tmpfilename);
        var options = {
          executablePath: vscode.workspace.getConfiguration('markdown-pdf')['executablePath'] || puppeteer.executablePath(),
          args: ['--lang='+vscode.env.language, '--no-sandbox', '--disable-setuid-sandbox']
          // Setting Up Chrome Linux Sandbox
          // https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md#setting-up-chrome-linux-sandbox
      };
        const browser = await puppeteer.launch(options);
        const page = await browser.newPage();
        await page.setDefaultTimeout(0);
        await page.goto(vscode.Uri.file(tmpfilename).toString(), { waitUntil: 'networkidle0' });
        // generate pdf
        // https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions
        if (type == 'pdf') {
          // If width or height option is set, it overrides the format option.
          // In order to set the default value of page size to A4, we changed it from the specification of puppeteer.
          var width_option = vscode.workspace.getConfiguration('markdown-pdf', uri)['width'] || '';
          var height_option = vscode.workspace.getConfiguration('markdown-pdf', uri)['height'] || '';
          var format_option = '';
          if (!width_option && !height_option) {
            format_option = vscode.workspace.getConfiguration('markdown-pdf', uri)['format'] || 'A4';
          }
          var landscape_option;
          if (vscode.workspace.getConfiguration('markdown-pdf', uri)['orientation'] == 'landscape') {
            landscape_option = true;
          } else {
            landscape_option = false;
          }
          var options = {
            path: exportFilename,
            scale: vscode.workspace.getConfiguration('markdown-pdf', uri)['scale'],
            displayHeaderFooter: vscode.workspace.getConfiguration('markdown-pdf', uri)['displayHeaderFooter'],
            headerTemplate: transformTemplate(vscode.workspace.getConfiguration('markdown-pdf', uri)['headerTemplate'] || ''),
            footerTemplate: transformTemplate(vscode.workspace.getConfiguration('markdown-pdf', uri)['footerTemplate'] || ''),
            printBackground: vscode.workspace.getConfiguration('markdown-pdf', uri)['printBackground'],
            landscape: landscape_option,
            pageRanges: vscode.workspace.getConfiguration('markdown-pdf', uri)['pageRanges'] || '',
            format: format_option,
            width: vscode.workspace.getConfiguration('markdown-pdf', uri)['width'] || '',
            height: vscode.workspace.getConfiguration('markdown-pdf', uri)['height'] || '',
            margin: {
              top: vscode.workspace.getConfiguration('markdown-pdf', uri)['margin']['top'] || '',
              right: vscode.workspace.getConfiguration('markdown-pdf', uri)['margin']['right'] || '',
              bottom: vscode.workspace.getConfiguration('markdown-pdf', uri)['margin']['bottom'] || '',
              left: vscode.workspace.getConfiguration('markdown-pdf', uri)['margin']['left'] || ''
            },
            timeout: 0
          };
          await page.pdf(options);
        }

        // generate png and jpeg
        // https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagescreenshotoptions
        if (type == 'png' || type == 'jpeg') {
          // Quality options do not apply to PNG images.
          var quality_option;
          if (type == 'png') {
            quality_option = undefined;
          }
          if (type == 'jpeg') {
            quality_option = vscode.workspace.getConfiguration('markdown-pdf')['quality'] || 100;
          }

          // screenshot size
          var clip_x_option = vscode.workspace.getConfiguration('markdown-pdf')['clip']['x'] || null;
          var clip_y_option = vscode.workspace.getConfiguration('markdown-pdf')['clip']['y'] || null;
          var clip_width_option = vscode.workspace.getConfiguration('markdown-pdf')['clip']['width'] || null;
          var clip_height_option = vscode.workspace.getConfiguration('markdown-pdf')['clip']['height'] || null;
          var options;
          if (clip_x_option !== null && clip_y_option !== null && clip_width_option !== null && clip_height_option !== null) {
            options = {
              path: exportFilename,
              quality: quality_option,
              fullPage: false,
              clip: {
                x: clip_x_option,
                y: clip_y_option,
                width: clip_width_option,
                height: clip_height_option,
              },
              omitBackground: vscode.workspace.getConfiguration('markdown-pdf')['omitBackground'],
            }
          } else {
            options = {
              path: exportFilename,
              quality: quality_option,
              fullPage: true,
              omitBackground: vscode.workspace.getConfiguration('markdown-pdf')['omitBackground'],
            }
          }
          await page.screenshot(options);
        }

        await browser.close();

        // delete temporary file
        var debug = vscode.workspace.getConfiguration('markdown-pdf')['debug'] || false;
        if (!debug) {
          if (isExistsPath(tmpfilename)) {
            deleteFile(tmpfilename);
          }
        }

        vscode.window.setStatusBarMessage('$(markdown) ' + exportFilename, StatusbarMessageTimeout);
      } catch (error) {
        showErrorMessage('exportPdf()', error);
      }
    } // async
  ); // vscode.window.withProgress
}