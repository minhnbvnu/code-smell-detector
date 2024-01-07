constructor() {
    super({
      element: document.createElement('div'),
    });
    this.element.setAttribute('hidden', 'hidden');
    this.element.className = 'ol-mask';
    this.element.innerHTML = '<div>Map not usable</div>';
  }