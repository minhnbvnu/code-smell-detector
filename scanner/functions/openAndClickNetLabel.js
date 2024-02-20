function openAndClickNetLabel(remote, url, findTimeout, expectedPageTitle, idx) {
    var utils = new DriverUtils(remote);

    return remote
      .setFindTimeout(findTimeout)
      .get(url)
      // The Preview tab must be selected
      .then(utils.cbAssertElementContainsText("css=.PreviewTab.selected", "Preview"))
      // There must be one page (expanded).
      .then(utils.cbAssertElementContainsText("css=.pageRow.opened", expectedPageTitle))
      .then(clickNetLabel(idx));
  }