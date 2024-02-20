function checkVisibilityAndApplyClass(target, htmlBadgeDiv) {

  if (target === null) {
    htmlBadgeDiv.classList.add("fbc-badge-disabled");
    return false;
  }

  const htmlBadgeDivHasDisabledClass = htmlBadgeDiv.classList.contains("fbc-badge-disabled");

  if (!isVisible(target)) {
    if (!htmlBadgeDivHasDisabledClass) {
      htmlBadgeDiv.classList.add("fbc-badge-disabled");
    }
    return false;
  }

  const { parentElement } = target;
  if (parentElement) {
    if (!isVisible(parentElement)) {
      if (!htmlBadgeDivHasDisabledClass) {
        htmlBadgeDiv.classList.add("fbc-badge-disabled");
      }
      return false;
    } else {
      if (htmlBadgeDivHasDisabledClass) {
        htmlBadgeDiv.classList.remove("fbc-badge-disabled");
      }
      return true;
    }
  }

  const { offsetParent } = target;
  if (offsetParent) {
    if (!isVisible(parentElement)) {
      if (!htmlBadgeDivHasDisabledClass) {
        htmlBadgeDiv.classList.add("fbc-badge-disabled");
      }
      return false;
    } else {
      if (htmlBadgeDivHasDisabledClass) {
        htmlBadgeDiv.classList.remove("fbc-badge-disabled");
      }
      return true;
    }
  }
  return true;
}