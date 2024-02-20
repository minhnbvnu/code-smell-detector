function shareBadgeEventListenerInit(target, htmlBadgeDiv, options) {
  if (!options.allowClickThrough) {
    target.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  }

  target.addEventListener("mouseover", () => {
    target.classList.add("fbc-badge-tooltip-active");
    htmlBadgeDiv.classList.add("fbc-badge-tooltip-active");
    setTimeout(() => {
      positionPrompt(htmlBadgeDiv);
    }, 50);
  });

  target.addEventListener("mouseout", () => {
    target.classList.remove("fbc-badge-tooltip-active");
    htmlBadgeDiv.classList.remove("fbc-badge-tooltip-active");
  });
}