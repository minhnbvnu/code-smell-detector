function getOffsetsAndApplyClass(elemRect, bodyRect, target, htmlBadgeDiv) {
  if (!isFixed(target) && htmlBadgeDiv.classList.contains("fbc-badge-fixed")) {
    htmlBadgeDiv.classList.remove("fbc-badge-fixed");
  } else if (isFixed(target)) {
    htmlBadgeDiv.classList.add("fbc-badge-fixed");
    return { offsetPosX: elemRect.left, offsetPosY: elemRect.top };
  } else {
    // Removed left body offset calc as it doesn't apply
    // return {offsetPosX: elemRect.left - bodyRect.left, offsetPosY: elemRect.top - bodyRect.top};
    return { offsetPosX: elemRect.left, offsetPosY: elemRect.top + window.scrollY };
  }
}