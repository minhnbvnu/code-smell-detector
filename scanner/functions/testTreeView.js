function testTreeView(remote, url, expectedPageTitle, tabName, firstLabel, firstValue) {
    const utils = new DriverUtils(remote);
    return appDriver.openAndClickFirstNetLabel(remote, url, findTimeout, expectedPageTitle)
      .then(appDriver.clickTab(tabName))
      .then(utils.cbAssertElementContainsText("css=.memberLabelCell", firstLabel))
      .then(utils.cbAssertElementContainsText("css=.memberValueCell", firstValue));
  }