function getHtmlAsset(htmlString) {
    return new AssetGraph({ root: __dirname }).addAsset({
      type: 'Html',
      text:
        htmlString || '<!doctype html><html><head></head><body></body></html>',
      url: `file://${__dirname}doesntmatter.html`,
    });
  }