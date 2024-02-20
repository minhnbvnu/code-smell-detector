function isAbstractTag(ele) {
    return ele && ele.length && /ion-side-menus|ion-tabs/i.test(ele[0].tagName);
  }