function createBadgeFragment(socialAction) {
  const htmlBadgeFragment = document.createDocumentFragment();

  for (let className of fragmentClasses) {
    const div = document.createElement("div");
    div.className = className;
    htmlBadgeFragment.appendChild(div);
  }

  // Create Tooltip
  const htmlBadgeFragmentTooltipDiv = htmlBadgeFragment.querySelector(".fbc-badge-tooltip");
  htmlBadgeFragmentTooltipDiv.appendChild(document.createTextNode(getTooltipFragmentStrings(socialAction)));

  // Create Empty Wrapper Div
  const htmlBadgeWrapperDiv = document.createElement("div");
  htmlBadgeWrapperDiv.appendChild(htmlBadgeFragment);

  return htmlBadgeWrapperDiv;
}