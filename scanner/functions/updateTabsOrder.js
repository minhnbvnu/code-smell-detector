function updateTabsOrder(tabArray) {
  for (var j = tabArray.length - 1; j >= 0; j--) {
    updateTabOrder(tabArray[j].id)
  }
}