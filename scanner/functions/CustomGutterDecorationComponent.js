constructor(props) {
    this.props = props;
    this.element = document.createElement('div');
    const { top, height, className, element } = this.props;

    this.element.style.position = 'absolute';
    this.element.style.top = top + 'px';
    this.element.style.height = height + 'px';
    if (className != null) this.element.className = className;
    if (element != null) {
      this.element.appendChild(element);
      element.style.height = height + 'px';
    }
  }