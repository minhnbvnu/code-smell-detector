function addFacebookBadge(target, badgeClassUId, socialAction) {
  // Detect if target is visible

  const htmlBadgeDiv = createBadgeFragment(socialAction);

  const htmlBadgeFragmentFenceDiv = htmlBadgeDiv.querySelector(".fbc-badge-fence");

  htmlBadgeDiv.className = "fbc-badge " + badgeClassUId;

  document.body.appendChild(htmlBadgeDiv);

  const itemWidth = parseInt(target.offsetWidth, 10);
  const itemHeight = parseInt(target.offsetHeight, 10);

  const ratioCheck = (itemWidth / itemHeight);


  const badgeSmallSwitch = shouldBadgeBeSmall(ratioCheck, itemHeight);
  if (badgeSmallSwitch) {
    htmlBadgeDiv.classList.add("fbc-badge-small");
  }

  const fbcIframeHeightLogin = 230;
  const fbcIframeHeightEmail = 240;

  switch (socialAction) {
  case "login":
    htmlBadgeFragmentFenceDiv.addEventListener("click", (e) => {
      if (!e.isTrusted) {
        // The click was not user generated so ignore
        return false;
      }
  
      else {
        e.preventDefault();
        e.stopPropagation();
        openInputPrompt("login", e.target.parentElement, target, fbcIframeHeightLogin);    
      }
    });
    break;
  case "email":
    // Remove the email prompt when the "do not show me again" checkbox is ticked for the first time
    window.addEventListener("message", () => {
      if (
        localStorage.getItem("checkbox-ticked") === "true"
      ) {
        htmlBadgeFragmentFenceDiv.remove();
        closeIframe();
      }
    });
    htmlBadgeFragmentFenceDiv.addEventListener("click", (e) => {
      if (!e.isTrusted) {
        // The click was not user generated so ignore
        return false;
      }
      e.preventDefault();
      e.stopPropagation();
      openInputPrompt("email", e.target.parentElement, target, fbcIframeHeightEmail);
    });
    break;
  case "share-passive":
    htmlBadgeDiv.classList.add("fbc-badge-share-passive", "fbc-badge-share");
    shareBadgeEventListenerInit(target, htmlBadgeDiv, { allowClickThrough: true });
    break;
  case "share":
    htmlBadgeDiv.classList.add("fbc-badge-share");
    shareBadgeEventListenerInit(target, htmlBadgeDiv, { allowClickThrough: true });
    break;
  } 

  // Applies to both!
  htmlBadgeFragmentFenceDiv.addEventListener("mouseenter", () => {
    positionPrompt(htmlBadgeDiv);
  });

  positionFacebookBadge(target, badgeClassUId, itemWidth, badgeSmallSwitch);
}