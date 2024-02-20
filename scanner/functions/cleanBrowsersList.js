function cleanBrowsersList(browserList) {
  return uniq(browserslist(browserList).map((browser) => browser.split(" ")[0]))
}