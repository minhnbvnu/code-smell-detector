function patternDetection(selectionArray, socialActionIntent){
  let querySelector = selectionArray.join(",");

  for (let item of document.querySelectorAll(querySelector)) {
    // overlay the FBC icon badge on the item
    if (!item.classList.contains("fbc-has-badge") && !isPinterest(item) && !parentIsBadged(item)) {
      const itemUIDClassName = "fbc-UID_" + (facebookDetectedElementsArr.length + 1);
      const itemUIDClassTarget = "js-" + itemUIDClassName;
      const socialAction = socialActionIntent;
      facebookDetectedElementsArr.push(itemUIDClassName);
      addFacebookBadge(item, itemUIDClassTarget, socialAction);
      item.classList.add("fbc-has-badge");
      item.classList.add(itemUIDClassName);

    }
  }
}