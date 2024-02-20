function hideMenu() {
  	menuElement.style.transform = "translateX(-110%)";
    menuElement.classList.remove('menu--show');
    menuOverlayElement.classList.remove('menu__overlay--show');
    menuElement.addEventListener('transitionend', onTransitionEnd, false);
  }