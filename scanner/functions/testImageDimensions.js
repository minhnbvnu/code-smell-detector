function testImageDimensions(remote, url, expectedPageTitle, idx, isExternalImage, width, height, delta) {
    delta = delta || 0;

    const tabName = isExternalImage ? "ExternalImage" : "Image";

    return appDriver.openAndClickNetLabel(remote, url, findTimeout, expectedPageTitle, idx)
      .then(appDriver.clickTab(tabName))
      .findByCssSelector(".tabBody.selected")
      .then(function(body) {
        return body.findByCssSelector("img")
          .then(function(img) {
            // return the image for waitForImageToLoad
            return img;
          });
      })
      .then(appDriver.waitForImageToLoad(timeoutForExternalImagesToLoad))
      .then(function(size) {
        // size is NOT from Leadfoot getSize()?
        // img.getSize() seems to be unreliable,
        // with different values coming from the different browser WebDrivers.
        assert.closeTo(size.height, height, delta, "height");
        assert.closeTo(size.width, width, delta, "width");
      });
  }