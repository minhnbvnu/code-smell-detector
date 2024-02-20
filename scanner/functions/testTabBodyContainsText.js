function testTabBodyContainsText(remote, url, expectedPageTitle, tabName, expectedTabBody) {
    const utils = new DriverUtils(remote);
    return appDriver.openAndClickFirstNetLabel(remote, url, findTimeout, expectedPageTitle)
      .then(appDriver.clickTab(tabName))
      .then(utils.cbAssertElementContainsText("css=.tab" + tabName + "Body.tabBody.selected ", expectedTabBody));
  }