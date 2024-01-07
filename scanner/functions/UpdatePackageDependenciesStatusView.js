constructor(statusBar) {
    this.statusBar = statusBar;
    this.element = document.createElement('update-package-dependencies-status');
    this.element.classList.add(
      'update-package-dependencies-status',
      'inline-block',
      'is-read-only'
    );
    this.spinner = document.createElement('span');
    this.spinner.classList.add(
      'loading',
      'loading-spinner-tiny',
      'inline-block'
    );
    this.element.appendChild(this.spinner);
  }