function positionPrompt(activeBadge) {
  const elemRect = activeBadge.getBoundingClientRect();

  if ((window.innerWidth - elemRect.left) < 350) {
    activeBadge.classList.add("fbc-badge-prompt-align-right");
  }

  const modifierClassList = ["fbc-badge-prompt-align-top", "fbc-badge-prompt-align-bottom", "fbc-badge-prompt-align-right"];

  if (elemRect.top < 140) {
    activeBadge.classList.add("fbc-badge-prompt-align-top");
  } else if ((window.innerHeight - elemRect.bottom) < 130) {
    activeBadge.classList.add("fbc-badge-prompt-align-bottom");
  } else if ((window.innerWidth - elemRect.left) < 350) {
    activeBadge.classList.add("fbc-badge-prompt-align-right");
  } else {
    activeBadge.classList.remove(...modifierClassList);
  }
}