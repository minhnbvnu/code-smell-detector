function initMenuToggle() {
  toggleMenuButton.setAttribute('aria-expanded', false);
  toggleMenuButton.setAttribute('aria-controls', 'menu');

  toggleMenuButton.addEventListener('click', function () {
    if (mql.matches) {
      let expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', !expanded);
      toggleMenuButton.classList.toggle('is-active');
      menu.hidden = !menu.hidden;
    }
  });

  menuInitialized = true;
}